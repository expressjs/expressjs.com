#!/bin/sh

# Get the version number of the latest release
# curl -i https://api.github.com/repos/<org>/<repo>/releases/latest
# Look for "tag_name": "1.15.2",
# First argument is org/owner name
# Second argument is repo name

#Lazy way to use GitHub auth.. put your username & password here and add -u USER_PWD to curl commands
#USER_PWD=""

get_release_vers() {
  echo "Getting version of latest release from " https://api.github.com/repos/$1/$2/releases/latest
  VERS=$(curl -s -i https://api.github.com/repos/$1/$2/releases/latest | grep "tag_name")

  if [ -z "$VERS" ]
  then
    echo "Latest release not found; Falling back to master"
    VERS="master"
  else
    echo "Getting latest tagged release... "
    VERS=${VERS%??}
    VERS=${VERS:15}
    echo "Latest release is" $VERS
  fi

  RELEASE_VERS=$VERS
  echo "RELEASE_VERS of $1/$2 is "$RELEASE_VERS
}

## First argument must be name of module
## Optional second arg is name of README file. Default is README.md

# <div class="doc-box doc-notice" markdown="1">
# This doc was generated from <README URL> on <date>
# </div>

writefile_mw() {
  FRONTMATTER=$'---\nlayout: middleware\ntitle: Express '$1$' middleware\nmenu: resources\nlang: en\nredirect_from: \'/resources/middleware/'$1$'.html\'\nname: '$1$'\n---'
  FILE=en/resources/middleware/$1.md
  README=${2:-README.md}
  ORG=expressjs

  echo "$FRONTMATTER" > $FILE
  get_release_vers $ORG $1
  echo '<div id="page-doc" markdown="1">' >> $FILE
  curl -s https://raw.githubusercontent.com/$ORG/$1/$RELEASE_VERS/$README >> $FILE
  echo '</div>' >> $FILE
  echo "Curling to https://raw.githubusercontent.com/$ORG/$1/$RELEASE_VERS/$README"
  echo "Writing $FILE"
}

## First argument must be name of module
## Optional second arg is org (Default is "jshttp" or "pillarjs").
## Optional third arg is name of README file. Default is README.md
writefile_util() {
  FRONTMATTER=$'---\nlayout: middleware\ntitle: Express '$1$' utility function\nmenu: resources\nlang: en\nredirect_from: \'/resources/utils/'$1$'.html\'\nname: '$1$'\n---'
  FILE=en/resources/utils/$1.md
  ORG=${2:-jshttp}
  README=${3:-README.md}

  echo "$FRONTMATTER" > $FILE
  get_release_vers $ORG $1
  echo '<div id="page-doc" markdown="1">' >> $FILE
  curl -s https://raw.githubusercontent.com/$ORG/$1/$RELEASE_VERS/$README >> $FILE
  echo '</div>' >> $FILE
  echo "Curling to https://raw.githubusercontent.com/$ORG/$1/$RELEASE_VERS/$README"
  echo "Writing $FILE"
}

# expressjs
# curl https://api.github.com/orgs/expressjs/repos | grep full_name
# NOTE: Some repos removed manually
get_middleware_readmes () {
  writefile_mw "body-parser"
  writefile_mw "compression"
  writefile_mw "connect-rid"
  writefile_mw "cookie-parser"
  writefile_mw "cookie-session"
  writefile_mw "cors"
  writefile_mw "csurf"
  writefile_mw "errorhandler"
  writefile_mw "method-override"
  writefile_mw "morgan"
  writefile_mw "multer"
  writefile_mw "response-time"
  writefile_mw "serve-favicon"
  writefile_mw "serve-index"
  writefile_mw "serve-static"
  writefile_mw "session"
  writefile_mw "timeout"
  writefile_mw "vhost"
}

# jshttp - These are not currently used.
# curl https://api.github.com/orgs/jshttp/repos | grep full_name
# NOTE: Some repos removed manually
get_util_readmes() {
  writefile_util "negotiator" "jshttp"
  writefile_util "cookie" "jshttp"
  writefile_util "fresh" "jshttp"
  writefile_util "range-parser" "jshttp"
  writefile_util "methods" "jshttp"
  writefile_util "basic-auth" "jshttp"
  writefile_util "compressible" "jshttp"
  writefile_util "on-finished" "jshttp"
  writefile_util "accepts" "jshttp"
  writefile_util "type-is" "jshttp"
  writefile_util "statuses" "jshttp"
  writefile_util "mime-types" "jshttp"
  writefile_util "proxy-addr" "jshttp"
  writefile_util "style-guide" "jshttp"
  writefile_util "on-headers" "jshttp"
  writefile_util "vary" "jshttp"
  writefile_util "media-typer" "jshttp"
  writefile_util "etag" "jshttp"
  writefile_util "mime-db" "jshttp"
  writefile_util "http-push" "jshttp"
  writefile_util "http-errors" "jshttp"
  writefile_util "content-disposition" "jshttp"
  writefile_util "forwarded" "jshttp"
  writefile_util "content-type" "jshttp"
  writefile_util "http-assert" "jshttp" "readme.md"

# pillarjs - These are not currently used.
# curl https://api.github.com/orgs/pillarjs/repos | grep full_name
# NOTE: Some repos removed manually
  writefile_util "cookies" "pillarjs"
  writefile_util "csrf" "pillarjs" # Is this middleware?
  writefile_util "encodeurl" "pillarjs"
  writefile_util "extend-proto" "pillarjs"
  writefile_util "finalhandler" "pillarjs"
  writefile_util "parseurl" "pillarjs"
  writefile_util "path-match" "pillarjs"
  writefile_util "path-to-regexp" "pillarjs" "Readme.md"
  writefile_util "qs-strict" "pillarjs"
  writefile_util "resolve-path" "pillarjs"
  writefile_util "router" "pillarjs"
  writefile_util "routington" "pillarjs"
  writefile_util "send" "pillarjs"
  writefile_util "ssl-redirect" "pillarjs"
  writefile_util "templation" "pillarjs"
  writefile_util "understanding-csrf" "pillarjs"
}

### HERE'S WHAT ACTUALLY GETS DONE:
get_middleware_readmes
#get_util_readmes
