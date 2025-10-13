# pkill -f "Visual Studio Code"
sudo chown -R $(whoami) .
#delete all local tags and branches
git branch --merged | grep -v "^\*" | xargs git branch -d
git tag | xargs git tag -d 
# chmod +x scripts/list-commits.sh
# scripts/list-commits.sh
chmod +x scripts/create-all-card-tags.sh
scripts/create-all-card-tags.sh