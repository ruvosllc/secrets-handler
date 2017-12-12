#!/bin/bash

set -e

while [ "$#" -gt 0 ]; do
  case "$1" in
    -p|--path) path="$2"; shift 2;;
    -*) echo "Unknown option: $1" >&2; exit 1;;
    *) secrets_filename="$1"; shift 1; echo "secrets_filename is "$secrets_filename;;
  esac
done

path=${path:-$(uuidgen)}

echo "path is "$path
