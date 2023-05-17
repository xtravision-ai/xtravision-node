# Prepare for release

1. Merge all required changes/branches to dev branch.

2. Increase version as required in below files: (Always increase 
   - SDk Version. (package.json)

3. Update CHANGELOG.md file.

4. Raise PR to main.

5. Merge PR to main and follow below steps to publish JS package.

# Publish Package

1) from root directory run:

   ```yarn build```

2) for windows users:

   ```yarn build:windows```

3) and then publish with the command:

   ```npm publish```
