#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/sync_upstream.sh <upstream-git-url> [branch]
# Example: ./scripts/sync_upstream.sh git@github.com:ORG/REPO.git feature/smart-menu

UPSTREAM_URL=${1:-}
BRANCH=${2:-feature/smart-menu}

if [ -z "$UPSTREAM_URL" ]; then
  echo "Usage: $0 <upstream-git-url> [branch]"
  echo "Example: $0 git@github.com:ORG/REPO.git feature/smart-menu"
  exit 2
fi

echo "Adding upstream remote (if missing): $UPSTREAM_URL"
if git remote get-url upstream >/dev/null 2>&1; then
  echo "upstream already exists: $(git remote get-url upstream)"
else
  git remote add upstream "$UPSTREAM_URL"
fi

echo "Fetching upstream..."
git fetch upstream

echo "Checking out branch $BRANCH"
git checkout "$BRANCH"

echo "Rebasing onto upstream/main"
git rebase upstream/main

echo "If rebase succeeded, pushing updated branch to origin"
git push --force-with-lease origin "$BRANCH"

echo "Done. If conflicts occurred they must be resolved manually and then run: git rebase --continue"
