import type { Linter } from "eslint";

const ERROR = (...args: unknown[]): Linter.RuleEntry => {
    return ["error", ...args];
};
const WARN = (...args: unknown[]): Linter.RuleEntry => {
    return ["warn", ...args];
};
const OFF = (...args: unknown[]): Linter.RuleEntry => {
    return ["off", ...args];
};

export {
    ERROR,
    WARN,
    OFF,
};
