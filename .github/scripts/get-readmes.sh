#!/bin/bash

# The following is a 3 column list of org, repo, and branch.
# - If the branch is NOT specified, then the README for that project
#   will be pulled from npmjs.org instead and will reflect the latest
#   release.
# - If the branch IS specified, it will be used to fetch the README.md
#   from the given github repo. If that branch is NOT master, then the
#   branch name will be appended to the local readme file name.
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
expressjs session master
expressjs timeout master
expressjs vhost master
LIST_END
) | while read org repo branch; do
  # TODO: change the DEST when astro project is in the root of the repo instead of in a subdirectory.
  # Write the README.md to a file named after the repo
  DEST="../../astro/src/content/pages/en/resources/middleware/$repo.md"
  # When fetching from a branch of a gh repo
  GHURL="https://raw.githubusercontent.com/$org/$repo/$branch/README.md"
  # When fetching from the latest release of a node module
  NPMURL="https://registry.npmjs.org/$repo"

  # Preserve existing frontmatter if the file already exists
  FRONTMATTER=""
  if [ -f "$DEST" ]; then
    # Extract full frontmatter block (between --- delimiters)
    FRONTMATTER=$(awk '/^---$/{c++;next} c==1{print} c==2{exit}' "$DEST")
  fi

  if [ -z "$branch" ]; then
    # No branch means latest release, so fetch from npmjs.org
    echo "fetching $org/$repo from latest npmjs.org release..."
    CONTENT=$(curl -s $NPMURL | jq -r '.readme|rtrimstr("\n")')
  else
    # This allows us to specify a branch other than master if we want to.
    # In this case, the branch name is added to the readme name in the filename.
    if [ "$branch" != "master" ]; then
      DEST="../../astro/src/content/pages/en/resources/middleware/$repo-$branch.md"
    fi
    echo "fetching $org/$repo/$branch from GitHub's raw content domain..."
    CONTENT=$(curl -s $GHURL)
  fi

  # Remove the first h1 heading (title is rendered by the layout)
  CONTENT=$(echo "$CONTENT" | sed '0,/^# /{/^# /d}')

  # Write with frontmatter preserved
  if [ -n "$FRONTMATTER" ]; then
    printf '%s\n%s\n%s\n\n%s\n' "---" "$FRONTMATTER" "---" "$CONTENT" > $DEST
  else
    DESC=$(curl -s "https://registry.npmjs.org/$repo" | jq -r '.description // empty')
    printf '%s\n%s\n%s\n%s\n\n%s\n' "---" "title: $repo middleware" "description: $DESC" "---" "$CONTENT" > $DEST
  fi
done
