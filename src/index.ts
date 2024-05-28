import { merge, truthy } from "@ezez/utils";

import type { Linter } from "eslint";
import type { Options } from "./types.js";

import { defaultOptions } from "./defaults.js";
import { environment, stylistic, base, node, types, react, importPlugin, tests } from "./rules/index.js";

/**
 * Gets the eslint configuration based on the options.
 * @param options
 */
const getEslintConfig = (options: Options = {}): Linter.FlatConfig[] => {
    const mergedOptions = merge(defaultOptions, options);

    return [
        environment.get(mergedOptions),
        ...stylistic.get(mergedOptions),
        ...base.get(mergedOptions),
        node.get(mergedOptions),
        ...types.get(mergedOptions),
        ...react.get(mergedOptions),
        ...importPlugin.get(mergedOptions),
        tests.get(mergedOptions),
    ].filter(truthy);
};

// TODO add https://www.npmjs.com/package/eslint-plugin-jsdoc

// TODO look through deprecated

export {
    getEslintConfig,
};
