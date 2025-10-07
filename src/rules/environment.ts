import globals from "@ezez/_globals";
import parserTs from "@ezez/__typescript-eslint__parser";

import type { Linter } from "eslint";
import type { MergedOptions } from "../types.js";

const environment: Linter.Config = {
    linterOptions: {
        reportUnusedDisableDirectives: true,
        reportUnusedInlineConfigs: "error",
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
    files: [],
};

const get = (mergedOptions: MergedOptions): Linter.Config => {
    return {
        ...environment,
        files: mergedOptions.files!,
    };
};

export {
    get,
};
