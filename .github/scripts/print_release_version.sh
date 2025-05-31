#!/usr/bin/env bash
set -e

pnpm changeset version &>/dev/null
release_version=$(node -e "console.log(require('./tooling/eslint-config/package.json').version)")

git reset --hard &>/dev/null

echo "$release_version"
