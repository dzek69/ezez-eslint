All notable changes to this project will be documented in this file.

The format is based on [EZEZ changelog](https://ezez.dev/guidelines/changelog/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [UNRELEASED]
(nothing yet)

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
