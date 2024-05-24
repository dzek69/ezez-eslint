# @ezez/eslint

Zero config ESLint setup for all your projects. Very strict by default.

## Idea behind these

No tricks, no magic, no useless code, no complicated code.
Very opinionated about all these spaces, quotes, parentheses.
A bit of sanity applied, but not too much.

Based on now-deprecated:
- @dzek69/eslint-config-base
- @dzek69/eslint-config-typescript
- @dzek69/eslint-config-import
- @dzek69/eslint-config-react

## Setup

- install this package
- create `eslint.config.mjs` in your root folder:
```typescript
import { getEslintConfig } from "@ezez/eslint";

export default getEslintConfig();
```
- if you need `react`, pass `{ react: true }` option object to `getEslintConfig()`

## License

MIT
