import { truthy } from "@ezez/utils";
import { merge } from "ts-deepmerge";

import type { Linter } from "eslint";
import type { Options } from "./types.js";

import { defaultOptions } from "./defaults.js";
import {
    base, environment, importPlugin, importSort, node, react, reactHooks, stylistic, tests, todoTaskId, types,
} from "./rules/index.js";

/**
 * Gets the eslint configuration based on the options.
 * @param options
 */
const getEslintConfig = (options: Options = {}): Linter.Config[] => {
    const mergedOptions = merge.withOptions({ mergeArrays: false }, defaultOptions, options);

    return [
        environment.get(mergedOptions),
        ...stylistic.get(mergedOptions),
        ...base.get(mergedOptions),
        node.get(mergedOptions),
        ...types.get(mergedOptions),
        ...react.get(mergedOptions),
        ...reactHooks.get(mergedOptions),
        ...importPlugin.get(mergedOptions),
        ...importSort.get(mergedOptions),
        ...todoTaskId.get(mergedOptions),
        tests.get(mergedOptions),
    ].filter(truthy);
};

// TODO add https://www.npmjs.com/package/eslint-plugin-jsdoc

// TODO look through deprecated

export type { Options };
export { getEslintConfig, defaultOptions };

