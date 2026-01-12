import { join } from "path";

import type { Options } from "./types.js";

const EXTENSIONS = [
    "ts", "tsx",
    "cts", "mts",
    "js",
    "cjs", "mjs",
];

const DEFAULT_FILES = EXTENSIONS.map((ext) => `**/*.${ext}`);

const ensureExtensions = (inputPath: string, extensions = EXTENSIONS): string[] => {
    if (inputPath.includes("*")) {
        return [inputPath];
    }

    const segments = inputPath.split("/").filter(Boolean);
    if (!segments.length) {
        // weird path, let's just return it as is
        return [inputPath];
    }

    const lastSegment = segments[segments.length - 1];
    if (lastSegment?.includes(".")) {
        return [inputPath];
    }

    return extensions.map((ext) => {
        return join(inputPath, "**", `*.${ext}`);
    });
};

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
        allowShadow: [
            "name", "open", "close",
            "length", "top", "status",
            "event",
        ],
    },
};

export {
    defaultOptions,
    ensureExtensions,
    EXTENSIONS,
};
