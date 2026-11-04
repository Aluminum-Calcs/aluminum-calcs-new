


#!/bin/bash

# Commit message
MESSAGE=${1:-"Update project"}

echo "Adding changes..."
git add .

echo "Committing changes..."
git commit -m "$MESSAGE"

echo "Pushing to v3..."
git push origin v3 || exit 1

echo "Building project..."
npm run predeploy || exit 1

echo "Deploying to GitHub Pages..."
npm run deploy || exit 1

echo "Deployment complete!"
