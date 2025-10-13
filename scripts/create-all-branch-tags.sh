#!/bin/bash

# -------------------------------
# CONFIGURATION
# -------------------------------

# List of commits
tags=("ex1-card-step-0" "ex1-card-step-1" "ex1-card-step-2" "ex1-card-step-3" "ex1-card-step-4" "ex1-card-step-5" )
# Corresponding commit SHAs
shas=("4bbd870" "2398295" "f6213ae" "e33495a" "0e8e58f" "58df5d1" )


# -------------------------------
# Create or update tags
# -------------------------------
echo "Processing tags..."

for i in "${!tags[@]}"; do
    tag="${tags[$i]}"
    commit="${shas[$i]}"

    # Delete existing local tag if it exists
    if git show-ref --tags | grep -q "refs/tags/$tag"; then
        git tag -d "$tag"
        echo "Deleted existing local tag: $tag"
    fi

    # Delete tag from remote if it exists
    if git ls-remote --tags origin | grep -q "refs/tags/$tag"; then
        git push --delete origin "$tag"
        echo "Deleted existing remote tag: $tag"
    fi

    # Create new tag on specified commit
    git tag "$tag" "$commit"
    echo "Created tag: $tag -> $commit"

    # Push tag to remote
    git push origin "$tag"
    echo "Pushed tag to remote: $tag"
done

echo "✅ All tags processed and pushed successfully!"
