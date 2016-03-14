branchName=$(git symbolic-ref --short HEAD)

if [ -z "$(git status --porcelain)" ] || [ "$branchName" == "master" ]; then
  # Working directory clean and we're on master
  echo "All is good"
else
  # Uncommitted changes
  echo "Working directory is not clean or the current branch is not master"
fi
