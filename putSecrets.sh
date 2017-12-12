#!/bin/bash

set -e

while [ "$#" -gt 0 ]; do
  case "$1" in
    -p|--path) path="$2"; shift 2;;
    -o|--overwrite) overwrite="--overwrite"; shift 1;;
    -*) echo "Unknown option: $1" >&2; exit 1;;
    *) secrets_filename="$1"; shift 1;;
  esac
done

path=$(echo /${path:-$(uuidgen)}/ | tr -s '/' )
secrets_filename=${secrets_filename:-'secrets.json'}
overwrite=${overwrite:-''}

paths_to_leaves=( $(jq -r 'paths(scalars) | map(strings, numbers|tostring) | join(".")' $secrets_filename) )
leaves=( $(jq -r 'getpath(paths(scalars))' $secrets_filename) )

for i in ${!paths_to_leaves[@]}; do
  aws ssm put-parameter --name $path${paths_to_leaves[$i]} --type "SecureString" --value ${leaves[$i]} $overwrite
done
