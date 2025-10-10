#!/bin/bash

# Fetch latest tags from remote
git fetch --tags

# Get all tags starting with 'card-'
tags=$(git tag -l "card-*")

if [ -z "$tags" ]; then
  echo "No tags starting with 'card-' found."
  exit 0
fi

echo "Deleting the following tags:"
echo "$tags"

# Delete tags locally
for tag in $tags; do
  git tag -d "$tag"
done

# Delete tags from remote
for tag in $tags; do
  git push origin --delete "$tag"
done

echo "All 'card-' tags deleted locally and on remote."
