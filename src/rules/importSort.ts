import importSortPlugin from "@ezez/_eslint-plugin-simple-import-sort";
import { truthy } from "@ezez/utils";

import type { Linter } from "eslint";
import type { MergedOptions } from "../types.js";

import { ERROR } from "./_states.js";

const REGEX_REACT_LIBS_NOT_TYPES = "^(?!.*\\u0000)(?:react(?:[-/].*)?)$";
const REGEX_REACT_LIBS = "^react(?:[-/].*)?(?:\\u0000)?$";

const get = (mergedOptions: MergedOptions): Linter.Config[] => {
    return [
        mergedOptions.import && {
            name: "Import - simple sort",
            plugins: {
                "simple-import-sort": importSortPlugin,
            },
            rules: {
                "simple-import-sort/imports": ERROR({
                    groups: [
                        // Node.js builtins prefixed with `node:`.
                        ["^node:"],

                        [REGEX_REACT_LIBS_NOT_TYPES],

                        // Packages (runtime, not types)
                        // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                        ["^@?\\w(?:.*[^\\u0000])?$"],

                        // Absolute imports and other imports such as Vue-style `@/foo`.
                        // Anything not matched in another group.
                        ["^[^\\.+](?:.*[^\\u0000])?$"],

                        // Types - builtins, packages, absolute:
                        [
                            "^node:\\u0000$",
                            REGEX_REACT_LIBS, // this won't match just "react + type bit", but it's handled before
                            "^@\\w\\u0000$",
                            "^[^\\.+].*\\u0000$",

                            // Types - relative
                            "\\u0000$",
                        ],

                        // Relative imports.
                        // Anything that starts with a dot.
                        ["^\\."],

                        // Side effect goes last
                        ["^\\u0000"],
                    ],
                }),
            },
        },
    ].filter(truthy);
};

export {
    get,
    REGEX_REACT_LIBS_NOT_TYPES,
    REGEX_REACT_LIBS,
};
