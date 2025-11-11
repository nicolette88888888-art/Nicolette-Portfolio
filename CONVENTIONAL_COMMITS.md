# Conventional Commits Setup

This repository uses [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

## Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

## Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools
- **ci**: Changes to CI configuration files and scripts
- **build**: Changes that affect the build system or external dependencies
- **revert**: Reverts a previous commit

## Examples

```
feat: add user authentication
fix: resolve navigation bug on mobile
chore: update dependencies
docs: update README with setup instructions
refactor: simplify component structure
```

## Setup Instructions

To enable automatic commit message validation:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Initialize Husky (this will run automatically via the `prepare` script):
   ```bash
   npm run prepare
   ```

3. Create the commit-msg hook:
   ```bash
   npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
   ```

The commit message template is already configured. When you run `git commit` without `-m`, it will open the template in your editor.

