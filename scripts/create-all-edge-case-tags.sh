#!/bin/bash
set -e

branches=("edge-case-tags-0" "edge-case-tags-1" "edge-case-tags-2" "edge-case-tags-3")
tags=("edge-case-0-list-issues" "edge-case-1-heading-hierarchy" "edge-case-1-skip-link" "edge-case-2-live-region")

git fetch --all

for i in "${!branches[@]}"; do
  branch="${branches[$i]}"
  tag="${tags[$i]}"
  echo "Processing branch: $branch → tag: $tag"

  if git show-ref --verify --quiet "refs/remotes/origin/$branch"; then
    git checkout "$branch" >/dev/null 2>&1
    git tag -f "$tag"
    git push origin "$tag" --force
    echo "✅ Tag '$tag' created and pushed from branch '$branch'."
  else
    echo "⚠️ Branch '$branch' not found on origin — skipping."
  fi
done

git checkout main
