# Prepare for release

1. Merge all required branches into main branch.
   2.Increase version as required in below files: (Always increase minor version on every release except some hot-fixes or major changes).
   Example App. (example/pubspec.yaml)
   SDk Version. (pubspec.yaml)
2. Update CHANGELOG.md file.
3. Commit all into main branch and follow below steps to publish nodejs package.

# Publish Package

. from root directory run:

   `yarn build`

for windows users:
   ```yarn build:windows```

and then publish with the command:

   `npm publish `
