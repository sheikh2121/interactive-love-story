#!/bin/bash

# Get the commit message from the user
echo "Enter a description of your changes (commit message):"
read commit_message

# Add all changes
git add .

# Commit the changes
git commit -m "$commit_message"

# Push to GitHub
git push origin main

echo "Changes pushed to GitHub. Netlify will automatically deploy your updates."
echo "You can check your deployment status at https://app.netlify.com/"