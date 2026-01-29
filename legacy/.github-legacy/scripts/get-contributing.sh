#!/bin/bash

# This script replaces the contents of a section with the contents from the annotated source address or local file paths inside the DEST file.

# read contents of file into memory
DEST="../../en/resources/contributing.md"

# track the header level 
level=''
# tracks src for curl calls
src=''
# tracks file paths for local file reads
local=''
  while IFS= read -r line; do
  # REMOVE PREVIOUS CONTENT SECTION
  # if src or local tags are not empty
  if [[ -n "$src" || -n "$local" ]]; then
    #  if current line not a horitzontal rule hr
    if  [[ "$line" != "----"* ]]; then
    #  if line == level -- level is num of ##
      if [[ "$line" == "$level"'#'*  ||
      # line not a header line
      "$line" != '#'* ]]; then
        # skip line and rewrite over old content
          continue
      fi
    fi
  fi

 # PRINT TO PAGE SECTION
  src=''
  local=''
  # if line is a header
  if [[ "$line" == '#'* ]]; then
  # if header has (#id-of-link) or {#id-on-page} patterns
    if [[ $line =~ (\(\#.*\))\. || "$line" =~ \{\#.*\} ]]; then
      # isolate the matching part of line 
      match=${BASH_REMATCH[0]}
      # remove match - leaving rest
      rest=${line//${match}}
      # remove any # symbols from start 
      title_rest=${rest##*\#}
      # slice rest of line to get only level
      level="${rest:0:$((${#rest} - ${#title_rest}))}"
    else
    # any other headers -- these before SRC/LOCAL pages anchors
      header=${line##*\#} 
      level="${line:0:$((${#line} - ${#header}))}"
    fi
  # if line is SRC anchor in read file 
  elif [[ "$line" == '<!-- SRC:'* ]]; then
    # remove the first 10 chars
    src=${line:10}
    # % remove from end until after white space -- leaves src details
    src=${src% *}
  # if line is LOCAL anchor in read file 
  elif [[ "$line" == '<!-- LOCAL:'* ]]; then
    # remove the first 12 chars
    local=${line:12}
    # % remove from end until after white space -- leave local details
    local=${local% *}
    # leave only path to file
    local=${local#* }
  fi 
  # prints line to the page 
  echo "$line"
 
  if [[ -n "$local" ]]; then
  # cat file -- outputs full contents of file at local path 
    cat "$local" | \
    # remove the top 1# headers from cat'd file
      sed -En '/^##|^[^#]/,$p' | \
    # remove GH MD specific tags start w '[!NOTE\] + the following line
      sed -E '/^>\[!NOTE\]*/{N;d;}' | \
    # change GH specific MD IMPORTANT tags -> change into plain MD
      sed -E 's/> \[!IMPORTANT\]/> **IMPORTANT:** /g'
      echo
  elif [[ -n "$src" ]]; then  
    echo
    path=${src#* }
    repo=${src% *}
    curl -s "https://raw.githubusercontent.com/${repo}/master/${path}" | \
      # if line is ## or not #
      sed -En '/^##|^[^#]/,$p' | \
      # add additional # every header 
      sed 's/^#/&'"${level:1}"'/g' | \
      # format GH links when match
      sed -E 's/(\[[^]]*\])\(([^):#]*)\)/\1(https:\/\/github.com\/'"$(sed 's/\//\\\//g' <<< "$repo")"'\/blob\/master\/\2)/g'
    echo
  fi
  # read in dest file then write back to file
done <<<"$(< $DEST)" > $DEST
