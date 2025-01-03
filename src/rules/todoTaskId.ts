import { truthy } from "@ezez/utils";
import todoTaskId from "@ezez/eslint-plugin-todo-task-id";

import type { MergedOptions } from "../types.js";
import type { Linter } from "eslint";

import { ERROR } from "./_states.js";

const get = (mergedOptions: MergedOptions): Linter.FlatConfig[] => {
    return [
        mergedOptions.taskId && {
            name: "Todo Task ID plugin",
            plugins: {
                todoTaskId,
            },
            rules: {
                "todoTaskId/require-todo-task-number": ERROR(),
            },
        },
    ].filter(truthy);
};

export {
    get,
};
