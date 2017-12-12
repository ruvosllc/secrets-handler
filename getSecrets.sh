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

path=$(echo /$path/ | tr -s '/' )

secrets_filename=${secrets_filename:-'secrets.json'}
overwrite=${overwrite:-''}
quiet=${quiet:-''}

res=$(aws ssm get-parameters-by-path --path $path --with-decryption)
echo $res | jq '.Parameters | map(.Name | ltrimstr("/test/paul/") | split(".") | map(if test("^[0-9]+$") then tonumber else . end)) as $paths | map(if .Value == "true" then true elif .Value == "false" then false else .Value end) as $values | [index(.[])] | reduce .[] as $index ({}; setpath($paths[$index];$values[$index]))'
