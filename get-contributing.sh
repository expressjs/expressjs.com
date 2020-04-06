#!/bin/bash

DEST="en/resources/contributing.md"

# This script replaces the contents of a section with the contents from
# the annotated source address.

href=''
level=''
while IFS= read -r line; do
  if [[ -n "$href" ]] && [[ "$line" != '#'* || "$line" == "$level"'#'* ]]; then
    continue
  fi

  href=''
  if [[ "$line" == '#'* ]]; then
    title=${line##*\#}
    level="${line:0:$((${#line} - ${#title}))}"
  elif [[ "$line" == '<!-- SRC:'* ]]; then
    href=${line:10}
    href=${href% *}
  fi

  echo "$line"

  if [[ -n "$href" ]]; then
    echo
    curl -s "$href" | sed -En '/^##|^[^#]/,$p' | sed 's/^#/&'${level:1}'/g'
    echo
  fi
done <<<"$(< $DEST)" > $DEST
