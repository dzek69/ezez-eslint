All notable changes to this project will be documented in this file.

The format is based on [EZEZ changelog](https://ezez.dev/guidelines/changelog/).
This versions follows eslint package with versioning, bumping patch version as needed.
Changes in rules are never considered breaking.

## [UNRELEASED]
(nothing yet)

## [9.37.2+] - 2025-10-10
### Dev
- some chores

## [9.37.2] - 2025-10-10
### Changed
- upgraded `object-shorthand` to always expect shorthand
- always put `react` first when sorting imports

## [9.37.1] - 2025-10-09
### Removed
- disabled `no-useless-return` (will enable when disabling auto-fixing becomes a thing)
### Changed
- set some default allow list to `no-shadow` and allow easy customize
- replaced `import/order` with `eslint-plugin-simple-import-sort` (same groups, sorts alphabetically)
- updated @typescript-eslint/no-unsafe-member-access to allow optional chaining on any
- clarified versioning policy in the changelog
### Added
- added @typescript-eslint/no-misused-spread
- added @typescript-eslint/no-unnecessary-type-conversion
### Dev
- updated all the plugins
- removed eslint/compat

## [9.37.0] - 2025-10-07
### Changed
- rule `@stylistic/quotes` to allow template literals only to avoid escaping
- enable base `no-duplicate-imports` on typescript with no `import` plugin
- set new `reportUnusedInlineConfigs` linter option to true
- bump eslint & @stylistic/eslint-plugin to current versions
### Removed
- cjs build, it was broken anyway and shouldn't be needed
### Dev
- set packageManager field
- adjust version to exactly match current eslint

## [9.0.0] - 2025-08-25
### Changed
- version bump to match current major eslint, this allows to IDE eslint service to work
### Dev
- ts-library-template bump

## [0.3.0] - 2025-01-01
### Added
- new rule configured `@stylistic/curly-newline`
- ts rules: no-unsafe-function-type, no-unsafe-type-assertion, no-wrapper-object-types, related-getter-setter-pairs
### Changed
- disabled base `require-await` for tests (previously only ts version was disabled)
### Dev
- `jsx/indent` disabled as `indent` took over now
- some ts rules reconfigured with new options or new rules used instead of renamed/deprecated ones
- added disabled ts rules: no-deprecated
- eslint & plugins version bump
- other bumps to fix audit issues

## [0.2.0] - 2024-12-28
### Added
- `@ezez/eslint-plugin-todo-task-id` plugin (disabled by default)
### Dev
- bump import plugin to fix some issues

## [0.1.0] - 2024-11-07
### Changed
- `eslint` is no longer peer dependency
- all the eslint packages are now installed as renamed dependencies, which
should remove the need to install them manually to prevent versions mismatches
### Breaking
- you should use `ezlint` binary instead of `eslint` to run the linter

## [0.0.8] - 2024-06-10
### Changed
- set `eslint` as optional peer dependency, it should not be required to install eslint with this package, but if
something else also installs `eslint` the version may mismatch and you should manually install it anyway

## [0.0.7] - 2024-06-01
### Changed
- `@typescript-eslint/no-unnecessary-condition` & `@typescript-eslint/require-await` are now disabled in tests
### Added
- easy define custom rules for test files
- JSDocs for options object

## [0.0.6] - 2024-05-28
### Added
- option to specify config for test files
- property for extra rules config, currently allowing to set indentation
### Removed
- (unused) `getTestsDisabledRules` export

## [0.0.5] - 2024-05-28
### Changed
- with types enabled look for both `tsconfig.lint.json` and `tsconfig.json` by default

## [0.0.4] - 2024-05-28
### Fixed
- `no-duplicate-imports` should be disabled when using typescript and replaced with `import/no-duplicates` when using
`import` plugin

## [0.0.3] - 2024-05-28
### Fixed
- enable node and browser globals everywhere as temp workaround
### Dev
- improved config types

## [0.0.2] - 2024-05-26
### Added
- first version
