#!/bin/bash

# This script replaces the contents of a section with the contents from the
# annotated source address (SRC comments) inside the DEST file.
# SRC comments use the format: {/* SRC: org/repo path/to/file */}

DEST="../../src/content/pages/en/resources/contributing.mdx"

# Shared content transformations
transform_content() {
  local content="$1"
  local level="$2"

  # Keep only from first ## onward (skip title/badges)
  content=$(echo "$content" | sed -En '/^##|^[^#]/,$p')

  # Downgrade headings based on parent level
  content=$(echo "$content" | sed 's/^#/&'"${level:1}"'/g')

  # Convert GitHub callouts to Alert components
  content=$(echo "$content" | perl -0777 -pe '
    s/> \[!(IMPORTANT|NOTE|TIP|CAUTION|WARNING)\]\s*\n((?:>.*\n)*)/
      my $type = lc($1);
      my %map = (important => "info", note => "info", tip => "info", caution => "warning", warning => "warning");
      my $alert = $map{$type} || "info";
      my $body = $2;
      $body =~ s|^> ?||gm;
      "<Alert type=\"$alert\">\n\n${body}\n<\/Alert>\n"
    /ge')

  # Convert HTML comments to MDX comments
  content=$(echo "$content" | sed -E 's/<!--(.*)-->/\{\/\*\1\*\/\}/g')

  # Convert self-closing HTML tags for MDX compatibility
  content=$(echo "$content" | sed -E 's/<(br|hr|img)([^/]*[^/])?\s*>/<\1\2 \/>/gi')

  echo "$content"
}

level=''
src=''

while IFS= read -r line; do
  # Skip lines from previous SRC section (will be replaced)
  if [[ -n "$src" ]]; then
    if [[ "$line" != "----"* ]]; then
      if [[ "$line" == "$level"'#'* || "$line" != '#'* ]]; then
        continue
      fi
    fi
  fi

  src=''

  # Track heading level
  if [[ "$line" == '#'* ]]; then
    if [[ $line =~ (\(\#.*\))\. || "$line" =~ \{\#.*\} ]]; then
      match=${BASH_REMATCH[0]}
      rest=${line//${match}}
      title_rest=${rest##*\#}
      level="${rest:0:$((${#rest} - ${#title_rest}))}"
    else
      header=${line##*\#}
      level="${line:0:$((${#line} - ${#header}))}"
    fi
  # Detect SRC comment (MDX format)
  elif [[ "$line" == '{/* SRC:'* ]]; then
    src=${line:9}
    src=${src%% \*/*}
  fi

  echo "$line"

  if [[ -n "$src" ]]; then
    echo
    path=${src#* }
    repo=${src% *}

    echo "fetching $repo/$path..." >&2
    RAW=$(curl -s "https://raw.githubusercontent.com/${repo}/HEAD/${path}")

    # Convert relative links to absolute GitHub URLs
    BASEURL="https://github.com/${repo}/blob/HEAD"
    RAW=$(echo "$RAW" | sed -E "s|\]\(([^)#/][^):]*)\)|](${BASEURL}/\1)|g")

    TRANSFORMED=$(transform_content "$RAW" "$level")
    echo "$TRANSFORMED"
    echo
  fi
done <<<"$(< $DEST)" > $DEST

echo "Updated $DEST"
