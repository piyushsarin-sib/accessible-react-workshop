# To kill the VSCode process
pkill -f "Visual Studio Code"

# remove sudo issues
sudo chown -R $(whoami) .


# Delete all local tags and branches
git branch --merged | grep -v "^\*" | xargs git branch -d
git tag | xargs git tag -d 

# Setup github alias
chmod +x scripts/setup-git-aliases.sh
scripts/setup-git-aliases.sh



# get list of all commits with the tags name from a branch
chmod +x scripts/list-commits.sh
scripts/list-commits.sh


# Create old tags and create new tags from the list of tags and SHA
chmod +x scripts/create-all-card-tags.sh
scripts/create-all-card-tags.sh
