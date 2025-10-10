import importPlugin from "@ezez/_eslint-plugin-import";
import { truthy } from "@ezez/utils";

import type { Linter } from "eslint";
import type { MergedOptions } from "../types.js";

import { ERROR, OFF, WARN } from "./_states.js";

const get = (mergedOptions: MergedOptions): Linter.Config[] => {
    return [
        mergedOptions.import && {
            name: "Import - static analysis",
            plugins: {
                import: importPlugin,
            },
            settings: {
                "import/ignore": ["\\.(scss|saas|less|css|jpg|jpeg|gif|png|webm|webp|svg|ttf|woff|woff2)$"],
            },
            rules: {
                "import/consistent-type-specifier-style": ERROR(),
                "import/default": ERROR(),
                "import/enforce-node-protocol-usage": OFF(),
                "import/named": ERROR(),
                "import/namespace": ERROR(),
                "import/no-absolute-path": ERROR(),
                "import/no-cycle": ERROR({
                    // maxDepth: 0 - don't use until linting goes slow
                    ignoreExternal: true,
                    allowUnsafeDynamicCyclicDependency: false,
                }),
                "import/no-dynamic-require": OFF(),
                "import/no-empty-named-blocks": ERROR(),
                "import/no-internal-modules": OFF(),
                "import/no-relative-packages": OFF(),
                "import/no-relative-parent-imports": OFF(),
                "import/no-restricted-paths": OFF(),
                "import/no-self-import": ERROR(),
                "import/no-unresolved": OFF(),
                "import/no-useless-path-segments": ERROR({
                    noUselessIndex: false,
                    commonjs: false, // false by default, check if true will leave support for import syntax @TODO
                }),
                "import/no-webpack-loader-syntax": OFF(),
            },
        },
        mergedOptions.import && {
            name: "Import - warnings",
            rules: {
                "import/export": ERROR(),
                "import/no-named-as-default": WARN(),
                "import/no-named-as-default-member": OFF(), // annoying for getenv for example
                "import/no-deprecated": OFF(), // @TODO broken right now
                "import/no-extraneous-dependencies": ERROR({
                    devDependencies: true,
                    optionalDependencies: true,
                    peerDependencies: false,
                    bundledDependencies: false,
                    includeInternal: false,
                    includeTypes: true,
                }),
                "import/no-mutable-exports": ERROR(),
                "import/no-unused-modules": OFF(), // I don't understand it or it's broken
            },
        },
        mergedOptions.import && {
            name: "Import - module system",
            rules: {
                "import/unambiguous": OFF(),
                "import/no-commonjs": OFF(),
                "import/no-amd": WARN(),
                "import/no-nodejs-modules": OFF(),
                "import/no-import-module-exports": WARN(),
            },
        },
        mergedOptions.import && {
            name: "Import - style",
            rules: {
                "import/first": ERROR(),
                "import/exports-last": ERROR(),
                "import/no-duplicates": ERROR({
                    "considerQueryString": true,
                    "prefer-inline": false,
                }),
                "import/no-namespace": OFF(),
                "import/extensions": OFF(), // TODO make configurable with flat configs
                "import/order": OFF(),
                // TODO: reenable newlines-after-import after this is fixed https://github.com/import-js/eslint-plugin-import/issues/2913
                "import/newline-after-import": OFF({
                    count: 1,
                    considerComments: true,
                }),
                "import/prefer-default-export": OFF(),
                "import/max-dependencies": WARN({
                    max: 15,
                    ignoreTypeImports: true,
                }),
                "import/no-unassigned-import": OFF(),
                "import/no-named-default": WARN(),
                "import/no-default-export": WARN(),
                "import/no-named-export": OFF(),
                "import/no-anonymous-default-export": WARN({
                    allowArray: false,
                    allowArrowFunction: false,
                    allowAnonymousClass: false,
                    allowAnonymousFunction: false,
                    allowCallExpression: false,
                    allowNew: false,
                    allowLiteral: false,
                    allowObject: false,
                }),
                "import/group-exports": ERROR(),
                "import/dynamic-import-chunkname": OFF(),
            },
        },
        mergedOptions.import && mergedOptions.base?.types && {
            name: "Import - set parser & disable rules from base package that are not needed",
            settings: {
                "import/parsers": {
                    "@typescript-eslint/parser": [".ts", ".tsx"],
                },
            },
            rules: {
                "import/export": OFF(),
                "import/named": OFF(),
                "import/default": OFF(),
                "import/namespace": OFF(),
                "no-duplicate-imports": OFF(),
            },
        },
    ].filter(truthy);
};

export {
    get,
};
