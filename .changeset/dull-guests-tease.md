---
'@flammeo-cms/core': minor
'@flammeo-cms/tsconfig': patch
'@flammeo-cms/eslint-plugin': minor
'@flammeo-cms/eslint-config': patch
---

- :sparkles: new core package
- :sparkles: new eslint-plugin package
- implemented lint-staged support
- added pre-commit hook to husky for lint-staged
- added CmsResource and CmsList as starter core object types
- added eslint-plugin rule to ensure CmsList has a decorator
- added vitest support
- added new tests for core types
- added new tests for eslint-plugin rules
- updated base tsconfig to suit the project needs
