import type { Options } from "./types.js";

const EXTENSIONS = [
    "ts", "tsx",
    "cts", "mts",
    "js",
    "cjs", "mjs",
];

const DEFAULT_FILES = EXTENSIONS.map((ext) => `**/*.${ext}`);

const DEFAULT_INDENT = 4;

const defaultOptions: Options & Pick<Required<Options>, "files" | "config"> = {
    base: {
        possibleProblems: true,
        types: true,
        suggestions: true,
        deprecated: true,
    },
    stylistic: true,
    import: true,
    node: true,
    react: false,
    files: DEFAULT_FILES,
    tests: true,
    config: {
        indent: DEFAULT_INDENT,
    },
};

export {
    defaultOptions,
    EXTENSIONS,
};
