#!/bin/bash
set -e

branches=("card-tags-0" "card-tags-1" "card-tags-2" "card-tags-3" "card-tags-4" "card-tags-5")
tags=("card-0-list-issues" "card-1-semantics" "card-2-images-desc" "card-3-associations-labels" "card-4-focus-visible" "card-5-motion-reduce")

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
