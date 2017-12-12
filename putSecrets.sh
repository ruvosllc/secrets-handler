#!/bin/bash

set -e

while [ "$#" -gt 0 ]; do
  case "$1" in
    -p|--path) path="$2"; shift 2;;
    -o|--overwrite) overwrite="--overwrite"; shift 1;;
    -q|--quiet) quiet=true; shift 1;;
    -*) echo "Unknown option: $1" >&2; exit 1;;
    *) secrets_filename="$1"; shift 1;;
  esac
done

if [[ -z $path ]]; then
  path=$(uuidgen)
  echo "No path provided. Using "$path
fi
path=$(echo /$path/ | tr -s '/' )
secrets_filename=${secrets_filename:-'secrets.json'}
overwrite=${overwrite:-''}
quiet=${quiet:-''}

paths_to_leaves=( $(jq -r 'paths(scalars) | map(strings, numbers|tostring) | join(".")' $secrets_filename) )
leaves=( $(jq -r 'getpath(paths(scalars))' $secrets_filename) )

for i in ${!paths_to_leaves[@]}; do
  name=$path${paths_to_leaves[$i]}
  value=${leaves[$i]}
  aws ssm put-parameter --name $name --type "SecureString" --value $value $overwrite
  if [[ -z $quiet ]]; then echo "Put value \"$value\" at parameter \"$name\""; fi
done
