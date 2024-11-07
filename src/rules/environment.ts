import globals from "@ezez/_globals";
import parserTs from "@ezez/__typescript-eslint__parser";

import type { Linter } from "eslint";
import type { MergedOptions } from "../types.js";

const environment = {
    linterOptions: {
        reportUnusedDisableDirectives: true,
    },
    languageOptions: {
        parser: parserTs,
        parserOptions: {
            project: ["./tsconfig.lint.json", "./tsconfig.json"],
        },
        globals: {
            ...globals.browser,
            ...globals.node,
        },
    },
    files: [] satisfies string[],
};

const get = (mergedOptions: MergedOptions): Linter.FlatConfig => {
    return {
        ...environment,
        files: mergedOptions.files,
    };
};

export {
    get,
};
