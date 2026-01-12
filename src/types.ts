import type { Linter } from "eslint";

type LinterGlobals = NonNullable<Linter.Config["languageOptions"]>["globals"];

type Options = {
    /**
     * Base rules for everyday needs.
     */
    base?: {
        /**
         * Enable rules that help to avoid possible problems.
         */
        possibleProblems?: boolean;
        /**
         * Set of rules when your work with TypeScript.
         */
        types?: boolean;
        /**
         * Enable rules that provide suggestions.
         */
        suggestions?: boolean;
        /**
         * Enable rules that are deprecated.
         */
        deprecated?: boolean;
    } | undefined;
    /**
     * Stylistic rules. Disable if you use Prettier.
     */
    stylistic?: boolean | undefined;
    /**
     * Import plugin rules.
     */
    import?: boolean | undefined;
    /**
     * React plugin rules:
     * - undefined/false - disable
     * - true - enable
     * - array of strings - enable only in given folders, will add `✷✷.✷.jsx and ✷✷/✷.tsx if the path does not include any `✷` (anywhere) or `.` in last segment.
     * Setting it to `true`/array of strings enables base rules and hook base rules, but not react-compiler rules!
     */
    react?: boolean | string[] | {
        base: boolean;
        hooks: {
            base: boolean;
            compiler: boolean;
        };
        /**
         * Enable React rules only for files at given paths
         */
        files?: {
            paths: string[];
            /**
             * If true (default) it will add extensions (jsx, tsx) to given paths if they do not include `✷` (anywhere) or `.` in last segment
             * If array of strings - will add given extensions with the same rule as above
             */
            addExtensions: boolean | string[];
        };
    } | undefined;
    /**
     * Node.js related rules. Enable if you use node.
     */
    node?: boolean | undefined;
    /**
     * @ezez/eslint-plugin-todo-task-id plugin rule
     */
    taskId?: boolean | undefined;
    /**
     * Files to lint, defaults to all supported extensions in all folders.
     */
    files?: string[] | undefined;
    /**
     * Enable test-specific rules and settings.
     * When `true` it assumes `jest` as the runner.
     * Otherwise, you can specify the runner and/or globals.
     */
    tests?: boolean | {
        /**
         * Define your test runner (for globals)
         */
        runner?: "jest" | "mocha";
        /**
         * Define your custom globals if your test runner is not supported or if you want to add more/remove some.
         */
        globals?: LinterGlobals;
        /**
         * Should the rules that are annoying in the test files be disabled?
         */
        disableAnnoying?: boolean;
        /**
         * Custom rules for test files.
         * If `disableAnnoying` is `true`, then the rules are merged with the library-defined ones (your rules have
         * higher priority).
         */
        rules?: Linter.Config["rules"];
    } | undefined;
    /**
     * Configuration options for tweaking the rules to your needs.
     */
    config?: {
        /**
         * The number of spaces to use for indentation.
         */
        indent?: number;
        /**
         * List of variable names that can be shadowed (e.g. in inner scopes or as function parameters).
         */
        allowShadow?: string[];
    } | undefined;
};

type MergedOptions = Options & Pick<Required<Options>, "files" | "config">;

export type {
    Options,
    MergedOptions,
    LinterGlobals,
};
