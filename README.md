# @ezez/eslint

Zero config, all-in-one-package ESLint setup for all your projects.

## Idea behind these

All JS tricks & magic are disallowed. Explicit, readable code is preferred over short code.
It includes styling rules, if you find prettier too intrusive, this might be a good alternative.

Very opinionated, but configurable.

## Worry-less setup

- install this package
- create `eslint.config.mjs` in your root folder:
```typescript
import { getEslintConfig, detectReact } from "@ezez/eslint";

export default getEslintConfig({
    react: await detectReact(),
});
```
- then use `ezlint` command in place of usual `eslint` command

That's it, you don't need every plugin installed separately, you don't even need to install eslint!

## License

MIT
