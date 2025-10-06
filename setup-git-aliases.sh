#!/bin/bash

# Directory containing scripts in the repo
SCRIPT_DIR=".github"

# Iterate over all .sh files in SCRIPT_DIR
for file in "$SCRIPT_DIR"/*.sh; do
  # Skip if no .sh files found
  [ -e "$file" ] || continue

  filename=$(basename "$file")
  
  # Copy file to home directory
  cp "$file" ~/"$filename"
  
  # Make it executable
  chmod +x ~/"$filename"
  
  # Set git alias using filename without .sh extension
  alias_name="${filename%.sh}"
  git config --global alias.$alias_name "!~/$(basename "$file")"
  
  echo "Setup alias '$alias_name' for ~/$(basename "$file")"
done
