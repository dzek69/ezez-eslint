import globals from "globals";

import type { MergedOptions } from "../types.js";
import type { Linter } from "eslint";

import { EXTENSIONS } from "../defaults.js";

import { OFF } from "./_states.js";

const TESTS_DEFAULTS: NonNullable<Exclude<MergedOptions["tests"], boolean>> = {
    runner: "jest",
    disableAnnoying: true,
};

const get = (mergedOptions: MergedOptions): Linter.FlatConfig | null => {
    if (!mergedOptions.tests) {
        return null;
    }
    const options = typeof mergedOptions.tests === "boolean" ? TESTS_DEFAULTS : mergedOptions.tests;
    const disableAnnoying = options.disableAnnoying !== false;

    const rules = disableAnnoying
        ? {
            "global-require": OFF(),
            "max-lines": OFF(),
            "max-lines-per-function": OFF(),
            "max-statements": OFF(),
            "no-magic-numbers": OFF(),
            "func-names": OFF(),
            "no-unused-labels": OFF(),

            "react/no-multi-comp": OFF(),

            "@typescript-eslint/no-empty-function": OFF(),
            "@typescript-eslint/no-magic-numbers": OFF(),
            "@typescript-eslint/no-unsafe-call": OFF(),
            "@typescript-eslint/no-unsafe-member-access": OFF(),
            "@typescript-eslint/no-unnecessary-condition": OFF(),
            "@typescript-eslint/require-await": OFF(),
        }
        : {};
    const userRules = options.rules || {};

    return {
        name: "Tests related",
        files: EXTENSIONS.map((ext) => `**/*.spec.${ext}`),
        languageOptions: {
            globals: {
                ...(options.runner === "jest" ? globals.jest : {}),
                ...(options.runner === "mocha" ? globals.mocha : {}),
                ...options.globals,
            },
        },
        rules: {
            ...rules,
            ...userRules,
        },
    };
};

export {
    get,
};
