#!/bin/bash

# Directories in theme.
THEME_DIR=$(dirname "$0")/../themes/BC
BENTO_THEME_DIR=${THEME_DIR}/static/bcbento
STATIC_THEME_DIR=${BENTO_THEME_DIR}/static
JS_THEME_DIR=${STATIC_THEME_DIR}/js
SEARCH_LAYOUT=${THEME_DIR}/layouts/search/search.html.html

function show_usage() {
  echo "Usage:"
  echo "  deploy-bento path_to_client       Install a pre-built bento-client instance"
  echo "  deploy-bento -h                   Display this help message."
}

# Something went wrong.
function error_exit() {
  echo "$1" 1>&2
  exit 1
}

# Die if theme directories and files aren't where they are supposed to be.
if [ ! -d "$BENTO_THEME_DIR" ]; then
  error_exit "$BENTO_THEME_DIR: Bento directory not found in theme"
fi

if [ ! -d "$STATIC_THEME_DIR" ]; then
  error_exit "$STATIC_THEME_DIR: Bento static directory not found in theme"
fi

if [ ! -f "$SEARCH_LAYOUT" ]; then
  error_exit "$SEARCH_LAYOUT: Search layout not found in theme"
fi

# Get options
while getopts ":h" opt; do
  case ${opt} in
  h)
    show_usage
    exit 0
    ;;
  \?)
    error_exit "Invalid Option: -$OPTARG" 1>&2
    ;;
  esac
done
shift $(($OPTIND - 1))

# Get arguments
if [ -z "$1" ]; then
  show_usage
  error_exit "No path to bcbento-client supplied"
fi

path_to_client=$1
if [ ! -d "$path_to_client" ]; then
  error_exit "${path_to_client}: No such directory"
fi

build_index_path=${path_to_client}/build/index.html
if [ ! -f "$build_index_path" ]; then
  error_exit "${build_index_path}: Build index.html not found"
fi

echo "Remove old js dir..."
rm -r ${JS_THEME_DIR} || error_exit "$JS_THEME_DIR: Couldn't delete js directory"

echo "Remove stray javascript and json..."
for f in ${BENTO_THEME_DIR}/*js*; do
  if [ -f "$f" ]; then
    rm $f || error_exit " $f: Couldn't delete"
  fi
done

echo "Copy over new js directory..."
cp -r ${path_to_client}/build/static/js ${STATIC_THEME_DIR} || error_exit "Couldn't copy js directory"

echo "Copy over new stray javascript and json..."
cp ${path_to_client}/build/*js* ${BENTO_THEME_DIR} || error_exit "Couldn't copy stray js"

echo "Update search layout..."
build_index=$(cat ${build_index_path})
pattern='\/([^/]*.chunk.js).*\/([^/]*.chunk.js)'

[[ "$build_index" =~ $pattern ]]
loader_chunk=${BASH_REMATCH[1]}
main_chunk=${BASH_REMATCH[2]}

sed -i '' -e "s/[0-9]\.[^/]*.chunk.js/$loader_chunk/" $SEARCH_LAYOUT
sed -i '' -e "s/main\.[^/]*.chunk.js/$main_chunk/" $SEARCH_LAYOUT