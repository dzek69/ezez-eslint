import type { Linter } from "eslint";
import type { MergedOptions } from "../types.js";

import { ERROR, OFF, WARN } from "./_states.js";

const get = (mergedOptions: MergedOptions): Linter.FlatConfig | null => {
    return mergedOptions.node
        ? {
            name: "Node.js related",
            // replace with eslint plugin n
            rules: {
                "callback-return": ERROR(["callback", "cb", "done", "next"]),
                "global-require": WARN(),
                "handle-callback-err": ERROR("^(.*(e|E)rr|e$)"),
                "no-buffer-constructor": ERROR(),
                "no-mixed-requires": ERROR({
                    grouping: true,
                    allowCall: false,
                }),
                "no-new-require": ERROR(),
                "no-path-concat": ERROR(),
                "no-process-env": OFF(), // needed for dead code removing when bundling
                "no-process-exit": WARN(),
                "no-restricted-modules": OFF(),
                "no-sync": WARN(),
            },
        }
        : null;
};

export {
    get,
};
