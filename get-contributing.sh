#!/bin/bash

DEST="en/resources/contributing.md"

# This script replaces the contents of a section with the contents from
# the annotated source address.

level=''
src=''
while IFS= read -r line; do
  if [[ -n "$src" ]] && [[ "$line" != '#'* || "$line" == "$level"'#'* ]]; then
    continue
  fi

  src=''
  if [[ "$line" == '#'* ]]; then
    title=${line##*\#}
    level="${line:0:$((${#line} - ${#title}))}"
  elif [[ "$line" == '<!-- SRC:'* ]]; then
    src=${line:10}
    src=${src% *}
  fi

  echo "$line"

  if [[ -n "$src" ]]; then
    echo
    path=${src#* }
    repo=${src% *}
    curl -s "https://raw.githubusercontent.com/${repo}/master/${path}" | \
      sed -En '/^##|^[^#]/,$p' | \
      sed 's/^#/&'"${level:1}"'/g' | \
      sed -E 's/(\[[^]]*\])\(([^):#]*)\)/\1(https:\/\/github.com\/'"$(sed 's/\//\\\//g' <<< "$repo")"'\/blob\/master\/\2)/g'
    echo
  fi
done <<<"$(< $DEST)" > $DEST
