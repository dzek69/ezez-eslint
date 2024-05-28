import type { Linter } from "eslint";

type Options = {
    base?: {
        possibleProblems?: boolean;
        types?: boolean;
        suggestions?: boolean;
        deprecated?: boolean;
    };
    stylistic?: boolean;
    import?: boolean;
    react?: boolean;
    node?: boolean;
    files?: string[];
    /**
     * Enable test-specific rules and settings.
     * When `true` it assumes `jest` as the runner.
     * Otherwise, you can specify the runner and/or globals.
     */
    tests?: boolean | {
        runner?: "jest" | "mocha";
        globals?: NonNullable<Linter.FlatConfig["languageOptions"]>["globals"];
        /**
         * Should the rules that are annoying in the test files be disabled?
         */
        disableAnnoying?: boolean;
    };

    config?: {
        indent?: number;
    };
};

type MergedOptions = Options & Pick<Required<Options>, "files" | "config">;

export type {
    Options,
    MergedOptions,
};
