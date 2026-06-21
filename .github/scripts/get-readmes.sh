#!/bin/bash

# URL replacements applied to every fetched README, as "from|to" pairs.
# Use this for dead or moved links (e.g. pointing to a Wayback Machine snapshot).
# Add or remove entries as needed.
URL_REPLACEMENTS=(
  "http://www.famfamfam.com/lab/icons/silk/|https://web.archive.org/web/20230105212205/http://www.famfamfam.com/lab/icons/silk/"
  "http://www.famfamfam.com/|https://web.archive.org/web/20251120154741/http://www.famfamfam.com/"
)

# The following is a column list of org, repo, branch, and (optional) npm package.
# - If the branch is NOT specified, then the README for that project
#   will be pulled from npmjs.org instead and will reflect the latest
#   release.
# - If the branch IS specified, it will be used to fetch the README.md
#   from the given github repo. If that branch is NOT master, then the
#   branch name will be appended to the local readme file name.
# - The 4th column is the npm package name, used when it differs from the repo
#   name (e.g. repo `session` is published as `express-session`). It is used to
#   fetch the version/description and to build the npm link. Defaults to the repo.
(cat <<LIST_END
expressjs body-parser master
expressjs compression master
expressjs cookie-parser master
expressjs cookie-session master
expressjs cors master
expressjs errorhandler master
expressjs method-override master
expressjs morgan master
expressjs multer master
expressjs response-time master
expressjs serve-favicon master
expressjs serve-index master
expressjs serve-static master
expressjs session master express-session
expressjs timeout master connect-timeout
expressjs vhost master
LIST_END
) | while read org repo branch npm_pkg; do
  # TODO: change the DEST when astro project is in the root of the repo instead of in a subdirectory.
  # npm package name; defaults to the repo name when the 4th column is omitted.
  NPM_PKG="${npm_pkg:-$repo}"
  # Write the README.md to a file named after the repo
  DEST="../../src/content/pages/en/resources/middleware/$repo.mdx"
  # When fetching from a branch of a gh repo
  GHURL="https://raw.githubusercontent.com/$org/$repo/$branch/README.md"
  # When fetching from the latest release of a node module
  NPMURL="https://registry.npmjs.org/$NPM_PKG"

  # Fetch version and description from npm registry
  NPM_DATA=$(curl -s "$NPMURL")
  VERSION=$(echo "$NPM_DATA" | jq -r '.["dist-tags"].latest // empty')
  DESC=$(echo "$NPM_DATA" | jq -r '.description // empty')

  # Preserve existing frontmatter if the file already exists
  FRONTMATTER=""
  if [ -f "$DEST" ]; then
    FRONTMATTER=$(awk '/^---$/{c++;next} c==1{print} c==2{exit}' "$DEST")
  fi

  if [ -z "$branch" ]; then
    # No branch means latest release, so fetch from npmjs.org
    echo "fetching $org/$repo from latest npmjs.org release..."
    CONTENT=$(echo "$NPM_DATA" | jq -r '.readme|rtrimstr("\n")')
  else
    # This allows us to specify a branch other than master if we want to.
    # In this case, the branch name is added to the readme name in the filename.
    if [ "$branch" != "master" ]; then
      DEST="../../src/content/pages/en/resources/middleware/$repo-$branch.mdx"
    fi
    echo "fetching $org/$repo/$branch from GitHub's raw content domain..."
    CONTENT=$(curl -s $GHURL)
  fi

  # Remove the first h1 heading (title is rendered by the layout)
  CONTENT=$(echo "$CONTENT" | sed '0,/^# /{/^# /d}')

  # Remove badge lines ([![...][...]][...] patterns and reference-style badge links)
  CONTENT=$(echo "$CONTENT" | sed '/^\[\!\[.*\]\[.*\]\]\[.*\]$/d')
  CONTENT=$(echo "$CONTENT" | sed '/^\[.*\]:.*img\.shields\.io/d')
  CONTENT=$(echo "$CONTENT" | sed '/^\[.*\]:.*badgen\.net/d')
  CONTENT=$(echo "$CONTENT" | sed '/^\[.*\]:.*coveralls\.io/d')
  CONTENT=$(echo "$CONTENT" | sed '/^\[.*\]:.*github\.com\/.*\/actions/d')
  CONTENT=$(echo "$CONTENT" | sed '/^\[.*\]:.*securityscorecards\.dev/d')
  CONTENT=$(echo "$CONTENT" | sed '/^\[.*\]:.*opencollective\.com.*\/badge/d')
  CONTENT=$(echo "$CONTENT" | sed '/^\[.*\]:.*bestpractices\.coreinfrastructure\.org/d')
  # Remove HTML badge lines (<a><img></a> patterns)
  CONTENT=$(echo "$CONTENT" | sed '/<a[^>]*><img[^>]*><\/a>/d')

  # Convert GitHub callouts to Alert components
  CONTENT=$(echo "$CONTENT" | perl -0777 -pe '
    s/> \[!(IMPORTANT|NOTE|TIP|CAUTION|WARNING)\]\n((?:>.*\n)*)/
      my $type = lc($1);
      my %map = (important => "info", note => "info", tip => "info", caution => "warning", warning => "warning");
      my $alert = $map{$type} || "info";
      my $body = $2;
      $body =~ s|^> ?||gm;
      "<Alert type=\"$alert\">\n\n${body}\n<\/Alert>\n"
    /ge')

  # Convert HTML comments to MDX comments
  CONTENT=$(echo "$CONTENT" | sed -E 's/<!--(.*)-->/\{\/\*\1\*\/\}/g')

  # Convert self-closing HTML tags for MDX compatibility
  CONTENT=$(echo "$CONTENT" | sed -E 's/<(br|hr|img)([^/]*[^/])?\s*>/<\1\2 \/>/gi')

  # Convert single-command npm/npx code blocks into the PackageManagerCommand
  # component so readers can switch between npm, Yarn, pnpm and Bun. Only blocks
  # holding exactly one npm/npx command are converted; anything with shell
  # operators or multiple lines is left as a plain code block.
  CONTENT=$(echo "$CONTENT" | perl -0777 -pe '
    s{(```[ \t]*(?:sh|bash|shell|console)?[ \t]*\n[ \t]*\$?[ \t]*((?:npm|npx)\b[^\n]*?)[ \t]*\n```)}{
      my ($whole, $cmd) = ($1, $2);
      if ($cmd =~ m{[&|;`]}) { $whole }
      else {
        my $attr = ($cmd =~ m{"}) ? "command=\x27$cmd\x27" : "command=\"$cmd\"";
        "<PackageManagerCommand $attr />";
      }
    }ge')

  # Convert relative links to absolute GitHub URLs
  BASEURL="https://github.com/$org/$repo/blob/HEAD"
  CONTENT=$(echo "$CONTENT" | sed -E "s|\]\(([^)#/][^):]*)\)|](${BASEURL}/\1)|g")

  # Turn absolute self-links (https://expressjs.com/en/guide/x.html) into internal,
  # language-agnostic paths (/guide/x) so they resolve on this site and get localized
  # by the link plugin. Drops the host, a trailing .html, and a leading /<lang>/ segment.
  CONTENT=$(echo "$CONTENT" | perl -pe 's{https?://(?:www\.)?expressjs\.com(/[^\s)">]*)?}{
    my $p = defined($1) ? $1 : q{/};
    $p =~ s/\.html\b//;
    $p =~ s{^/[a-z]{2}(?:-[a-z]{2})?(?=/|$)}{};
    length($p) ? $p : q{/}
  }ge')

  # Apply configured URL replacements (dead/moved links → working alternatives).
  # The lookahead requires the match to end at a URL boundary, so a URL that is a
  # prefix of another (e.g. the site root vs a sub-path) isn't corrupted.
  for pair in "${URL_REPLACEMENTS[@]}"; do
    FROM="${pair%%|*}"
    TO="${pair#*|}"
    CONTENT=$(FROM="$FROM" TO="$TO" perl -pe 's/\Q$ENV{FROM}\E(?=[\s)">]|$)/$ENV{TO}/g' <<<"$CONTENT")
  done

  # Build the MDX import and component
  IMPORT="import MiddlewareInfo from '@components/patterns/MiddlewareInfo/MiddlewareInfo.astro';
import Alert from '@components/primitives/Alert/Alert.astro';
import PackageManagerCommand from '@components/patterns/PackageManagerCommand/PackageManagerCommand.astro';"
  GITHUB_URL="https://github.com/$org/$repo"
  NPM_PAGE="https://www.npmjs.com/package/$NPM_PKG"
  COMPONENT="<MiddlewareInfo version=\"${VERSION}\" github=\"${GITHUB_URL}\" npm=\"${NPM_PAGE}\" />"

  # Write with frontmatter preserved
  if [ -n "$FRONTMATTER" ]; then
    printf '%s\n%s\n%s\n\n%s\n\n%s\n\n%s\n' "---" "$FRONTMATTER" "---" "$IMPORT" "$COMPONENT" "$CONTENT" > $DEST
  else
    printf '%s\n%s\n%s\n%s\n\n%s\n\n%s\n\n%s\n' "---" "title: $repo middleware" "description: $DESC" "---" "$IMPORT" "$COMPONENT" "$CONTENT" > $DEST
  fi
done
