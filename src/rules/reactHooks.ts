import reactHooks from "@ezez/_eslint-plugin-react-hooks";
import { truthy } from "@ezez/utils";

import type { Linter } from "eslint";
import type { MergedOptions } from "../types.js";

import { getFilesPropertyForReact } from "../utils/react";
import { ERROR, OFF, WARN } from "./_states.js";

const get = (mergedOptions: MergedOptions): Linter.Config[] => {
    const shouldEnableBase = mergedOptions.react === true || Array.isArray(mergedOptions.react) || (
        typeof mergedOptions.react === "object" && mergedOptions.react.hooks.base
    );
    const shouldEnableCompiler = !Array.isArray(mergedOptions.react)
        && typeof mergedOptions.react === "object"
        && mergedOptions.react.hooks.compiler;

    return [
        shouldEnableBase && {
            name: "React hooks - base",
            plugins: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
                "react-hooks": reactHooks as any,
            },
            rules: {
                "react-hooks/rules-of-hooks": ERROR(),
                "react-hooks/exhaustive-deps": WARN({
                    additionalHooks: "(useEffect2|useTruthSelector)",
                }),
                "react-hooks/set-state-in-effect": WARN(),
                "react-hooks/set-state-in-render": WARN(),
                "react-hooks/static-components": WARN(),
                "react-hooks/component-hook-factories": ERROR(),
                "react-hooks/use-memo": ERROR(),
            },
        },
        shouldEnableCompiler && {
            name: "React hooks - compiler",
            plugins: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
                "react-hooks": reactHooks as any,
            },
            rules: {
                "react-hooks/config": OFF(),
                "react-hooks/gating": OFF(),

                "react-hooks/error-boundaries": ERROR(),
                "react-hooks/globals": ERROR(),
                "react-hooks/immutability": ERROR(),
                "react-hooks/incompatible-library": WARN(),
                "react-hooks/preserve-manual-memoization": WARN(),
                "react-hooks/purity": WARN(),
                "react-hooks/refs": WARN(),
                "react-hooks/unsupported-syntax": OFF(), // there are base eslint rules for this
            },
        },
    ].filter(truthy).map((item) => {
        return {
            ...item,
            ...getFilesPropertyForReact(mergedOptions),
        };
    });
};

export {
    get,
};
