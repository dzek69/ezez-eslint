/* eslint-disable max-lines,new-cap */

import stylistic from "@stylistic/eslint-plugin";
import typescript from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";
// @ts-expect-error No types needed
import react from "eslint-plugin-react";
// @ts-expect-error No types needed
import importPlugin from "eslint-plugin-import";
import { merge, truthy } from "@ezez/utils";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";

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
};

const ERROR = (...args: unknown[]): Linter.RuleEntry => {
    return ["error", ...args];
};
const WARN = (...args: unknown[]): Linter.RuleEntry => {
    return ["warn", ...args];
};
const OFF = (...args: unknown[]): Linter.RuleEntry => {
    return ["off", ...args];
};

const DEFAULT_FILES = [
    "**/*.ts", "**/*.tsx",
    "**/*.cts", "**/*.mts",
    "**/*.js",
    "**/*.cjs", "**/*.mjs",
];

const environment = {
    linterOptions: {
        reportUnusedDisableDirectives: true,
    },
    languageOptions: {
        parser: parserTs,
        parserOptions: {
            project: "./tsconfig.json",
        },
        globals: {
            ...globals.browser,
            ...globals.node,
        },
    },
    files: [] satisfies string[],
};

const INDENT = 4;

const defaultOptions: Options & Pick<Required<Options>, "files"> = {
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
};

/**
 * Gets the eslint configuration based on the options.
 * @param options
 */
const getEslintConfig = (options: Options = {}): Linter.FlatConfig[] => { // eslint-disable-line max-lines-per-function
    const mergedOptions = merge(defaultOptions, options);

    const env = {
        ...environment,
        files: mergedOptions.files,
    };

    return [
        env,
        mergedOptions.stylistic && {
            name: "Base stylistic",
            plugins: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
                "@stylistic": stylistic as any,
            },
            rules: {
                "@stylistic/array-bracket-newline": ERROR("consistent"),
                "@stylistic/array-bracket-spacing": ERROR("never"),
                "@stylistic/array-element-newline": OFF(),
                "@stylistic/arrow-parens": OFF(),
                "@stylistic/arrow-spacing": ERROR({
                    before: true,
                    after: true,
                }),
                "@stylistic/block-spacing": ERROR("always"),
                "@stylistic/brace-style": ERROR("stroustrup", { allowSingleLine: true }),
                "@stylistic/comma-dangle": ERROR({
                    arrays: "always-multiline",
                    objects: "always-multiline",
                    imports: "always-multiline",
                    exports: "always-multiline",
                    functions: "always-multiline",
                    enums: "always-multiline",
                    generics: "always-multiline",
                    tuples: "always-multiline",
                }),
                "@stylistic/comma-spacing": ERROR({
                    before: false,
                    after: true,
                }),
                "@stylistic/comma-style": ERROR("last"),
                "@stylistic/computed-property-spacing": ERROR("never", {
                    enforceForClassMembers: true,
                }),
                "@stylistic/dot-location": ERROR("property"),
                "@stylistic/eol-last": ERROR("always"),
                "@stylistic/function-call-spacing": ERROR("never"), // old name: func-call-spacing
                "@stylistic/function-call-argument-newline": OFF(), // Maybe enable later?
                "@stylistic/function-paren-newline": OFF(), // Can't be linted like I'd want
                "@stylistic/generator-star-spacing": ERROR({
                    before: true,
                    after: false,
                }),
                "@stylistic/implicit-arrow-linebreak": ERROR("beside"),
                "@stylistic/indent": ERROR(INDENT, {
                    SwitchCase: 1,
                }),
                "@stylistic/indent-binary-ops": ERROR(INDENT),
                "@stylistic/key-spacing": ERROR({
                    beforeColon: false,
                    afterColon: true,
                    mode: "strict",
                    align: undefined,
                }),
                "@stylistic/keyword-spacing": ERROR({
                    before: true,
                    after: true,
                }),
                "@stylistic/line-comment-position": OFF(),
                "@stylistic/linebreak-style": ERROR("unix"),
                "@stylistic/lines-around-comment": OFF(), // @TODO verify one day if can be enabled
                // @TODO: verify single line for defining non-function properties with esnext
                "@stylistic/lines-between-class-members": ERROR("always", { exceptAfterSingleLine: false }), // TODO this is very configureable now, we should check
                "@stylistic/max-len": ERROR({
                    code: 120,
                    tabWidth: INDENT,
                    comments: 1000,
                    ignorePattern: undefined,
                    ignoreComments: false,
                    ignoreTrailingComments: true,
                    ignoreUrls: true,
                    ignoreStrings: false,
                    ignoreTemplateLiterals: false,
                    ignoreRegExpLiterals: true,
                }),
                "@stylistic/max-statements-per-line": ERROR({
                    max: 2,
                }),
                "@stylistic/member-delimiter-style": ERROR({ // from TS
                    multiline: {
                        delimiter: "semi",
                        requireLast: true,
                    },
                    singleline: {
                        delimiter: "semi",
                        requireLast: false,
                    },
                    multilineDetection: "brackets",
                }),
                "@stylistic/multiline-comment-style": OFF(),
                "@stylistic/multiline-ternary": ERROR("always-multiline"),
                "@stylistic/new-parens": ERROR("always"),
                "@stylistic/newline-per-chained-call": OFF(),
                "@stylistic/no-confusing-arrow": ERROR({
                    allowParens: true,
                    onlyOneSimpleParam: false,
                }),
                "@stylistic/no-extra-parens": OFF(),
                "@stylistic/no-extra-semi": ERROR(),
                "@stylistic/no-floating-decimal": ERROR(),
                "@stylistic/no-mixed-operators": ERROR(), // no options here, defaults should always be sane
                "@stylistic/no-mixed-spaces-and-tabs": OFF(), // no-tabs will handle this
                "@stylistic/no-multi-spaces": ERROR({
                    ignoreEOLComments: false,
                    exceptions: {
                        Property: true,
                    },
                }),
                "@stylistic/no-multiple-empty-lines": ERROR({ max: 1, maxBOF: 0, maxEOF: 1 }),
                "@stylistic/no-tabs": ERROR(), // @TODO suggest a fix in documentation to present tab as `\t`
                "@stylistic/no-trailing-spaces": ERROR({
                    skipBlankLines: false,
                    ignoreComments: false,
                }),
                "@stylistic/no-whitespace-before-property": ERROR(),
                "@stylistic/nonblock-statement-body-position": OFF(), // curly will handle this
                "@stylistic/object-curly-newline": ERROR({
                    multiline: true,
                    consistent: true,
                }),
                "@stylistic/object-curly-spacing": ERROR("always"),
                "@stylistic/object-property-newline": ERROR({ allowAllPropertiesOnSameLine: true }),
                "@stylistic/one-var-declaration-per-line": OFF(),
                "@stylistic/operator-linebreak": ERROR("before"),
                "@stylistic/padded-blocks": ERROR("never"),
                "@stylistic/padding-line-between-statements": OFF(), // @TODO would be nice to have this configured
                "@stylistic/quote-props": ERROR("consistent-as-needed", {
                    keywords: false,
                }),
                "@stylistic/quotes": ERROR("double", {
                    avoidEscape: false,
                    allowTemplateLiterals: true,
                }),
                "@stylistic/rest-spread-spacing": ERROR("never"),
                "@stylistic/semi": ERROR("always", {
                    omitLastInOneLineBlock: false,
                    omitLastInOneLineClassBody: false,
                }),
                "@stylistic/semi-spacing": ERROR({
                    before: false,
                    after: true,
                }),
                "@stylistic/semi-style": ERROR("last"),
                "@stylistic/space-before-blocks": ERROR("always"),
                "@stylistic/space-before-function-paren": ERROR({
                    anonymous: "never",
                    named: "never",
                    asyncArrow: "always",
                }),
                "@stylistic/space-in-parens": ERROR("never"),
                "@stylistic/space-infix-ops": ERROR({
                    int32Hint: false,
                }),
                "@stylistic/space-unary-ops": ERROR({
                    words: true,
                    nonwords: false,
                }),
                "@stylistic/spaced-comment": ERROR("always", {
                    // exceptions: [],
                    block: {
                        balanced: true,
                    },
                    markers: ["/"],
                }),
                "@stylistic/switch-colon-spacing": ERROR({
                    before: false,
                    after: true,
                }),
                "@stylistic/template-curly-spacing": ERROR("never"),
                "@stylistic/template-tag-spacing": ERROR("never"),
                "@stylistic/type-annotation-spacing": ERROR(),
                "@stylistic/type-generic-spacing": ERROR(),
                "@stylistic/type-named-tuple-spacing": ERROR(),
                "@stylistic/wrap-iife": ERROR("inside", {
                    functionPrototypeMethods: true,
                }),
                "@stylistic/wrap-regex": OFF(),
                "@stylistic/yield-star-spacing": ERROR({
                    before: true,
                    after: false,
                }),
                "unicode-bom": ERROR("never"), // this is somehow similar to @stylistic/linebreak-style
            },
        },
        mergedOptions.stylistic && mergedOptions.react && {
            name: "JSX/React stylistic",
            rules: {
                "@stylistic/jsx-child-element-spacing": OFF(),
                "@stylistic/jsx-closing-bracket-location": ERROR({
                    location: "tag-aligned",
                }),
                "@stylistic/jsx-closing-tag-location": ERROR(),
                "@stylistic/jsx-curly-brace-presence": ERROR({
                    props: "always",
                    children: "ignore",
                }),
                "@stylistic/jsx-curly-newline": ERROR("never"),
                "@stylistic/jsx-curly-spacing": ERROR({
                    when: "never",
                    allowMultiline: true,
                    spacing: {
                        objectLiterals: "never",
                    },
                }),
                "@stylistic/jsx-equals-spacing": ERROR("never"),
                "@stylistic/jsx-first-prop-new-line": ERROR("multiline"),
                "@stylistic/jsx-function-call-newline": ERROR("multiline"),
                "@stylistic/jsx-indent": ERROR(INDENT, {
                    checkAttributes: true,
                    indentLogicalExpressions: true,
                }),
                "@stylistic/jsx-indent-props": ERROR({
                    indentMode: INDENT,
                    ignoreTernaryOperator: false,
                }),
                "@stylistic/jsx-max-props-per-line": ERROR({
                    when: "multiline",
                    maximum: 1,
                }),
                "@stylistic/jsx-newline": OFF(),
                "@stylistic/jsx-one-expression-per-line": OFF(), // too annoying,
                // it won't even allow `Count: {this.state.count}`
                "@stylistic/jsx-pascal-case": ERROR({
                    allowAllCaps: true,
                    allowLeadingUnderscore: false,
                    allowNamespace: false,
                    ignore: [],
                }),
                "@stylistic/jsx-props-no-multi-spaces": OFF(), // If you have enabled the core rule no-multi-spaces
                // with eslint >= 3, you don't need this rule.
                "@stylistic/jsx-quotes": ERROR("prefer-double"),
                "@stylistic/jsx-self-closing-comp": ERROR({
                    component: true,
                    html: true,
                }),
                "@stylistic/jsx-sort-props": OFF(),
                "@stylistic/jsx-tag-spacing": ERROR({
                    closingSlash: "never",
                    beforeSelfClosing: "always",
                    afterOpening: "never",
                    beforeClosing: "never",
                }),
                "@stylistic/jsx-wrap-multilines": ERROR({
                    declaration: "parens-new-line",
                    assignment: "parens-new-line",
                    return: "parens-new-line",
                    arrow: "parens-new-line",
                    condition: "parens-new-line",
                    logical: "parens-new-line",
                    prop: "parens-new-line",
                }),
            },
        },
        mergedOptions.base?.possibleProblems && {
            name: "Base possible problems",
            rules: {
                // TODO check for each problably does not makes sense for TS - check
                "array-callback-return": ERROR({ checkForEach: true, allowImplicit: true, allowVoid: false }),
                "constructor-super": ERROR(),
                "for-direction": ERROR(),
                "getter-return": ERROR({ allowImplicit: true }),
                "no-async-promise-executor": ERROR(),
                "no-await-in-loop": OFF(),
                "no-class-assign": ERROR(),
                "no-compare-neg-zero": ERROR(),
                "no-cond-assign": ERROR("except-parens"),
                "no-const-assign": ERROR(),
                "no-constant-binary-expression": ERROR(),
                "no-constant-condition": ERROR({ checkLoops: true }),
                "no-constructor-return": WARN(),
                "no-control-regex": OFF(),
                "no-debugger": ERROR(),
                "no-dupe-args": ERROR(),
                "no-dupe-class-members": ERROR(),
                "no-dupe-else-if": ERROR(),
                "no-dupe-keys": ERROR(),
                "no-duplicate-case": ERROR(),
                "no-duplicate-imports": ERROR({
                    includeExports: true,
                }),
                "no-empty-character-class": ERROR(),
                "no-empty-pattern": ERROR({ allowObjectPatternsAsParameters: false }),
                "no-ex-assign": ERROR(),
                "no-fallthrough": WARN(), // TODO verify options
                "no-func-assign": ERROR(),
                "no-import-assign": ERROR(),
                "no-inner-declarations": ERROR("both"),
                "no-invalid-regexp": ERROR({ allowConstructorFlags: [] }),
                "no-irregular-whitespace": ERROR({
                    skipStrings: true,
                    skipComments: false,
                    skipRegExps: true,
                    skipTemplates: true,
                    skipJSXText: false,
                }),
                "no-loss-of-precision": ERROR(),
                "no-misleading-character-class": ERROR({ allowEscape: false }),
                "no-new-native-nonconstructor": ERROR(),
                "no-obj-calls": ERROR(),
                "no-promise-executor-return": ERROR({ allowVoid: false }),
                "no-prototype-builtins": OFF(),
                "no-self-assign": ERROR({ props: true }),
                "no-self-compare": ERROR(),
                "no-setter-return": ERROR(),
                "no-sparse-arrays": WARN(),
                "no-template-curly-in-string": WARN(),
                "no-this-before-super": ERROR(),
                "no-undef": ERROR({ typeof: false }),
                "no-unexpected-multiline": WARN(),
                "no-unmodified-loop-condition": ERROR(),
                "no-unreachable": ERROR(),
                "no-unreachable-loop": ERROR(),
                "no-unsafe-finally": ERROR(),
                "no-unsafe-negation": ERROR({ enforceForOrderingRelations: true }),
                "no-unsafe-optional-chaining": ERROR({ disallowArithmeticOperators: true }),
                "no-unused-private-class-members": ERROR(),
                "no-unused-vars": ERROR({
                    vars: "all",
                    varsIgnorePattern: undefined,
                    args: "none",
                    argsIgnorePattern: undefined,
                    caughtErrors: "all", // can omit `(error)` otherwise
                    caughtErrorsIgnorePattern: undefined,
                    destructuredArrayIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                    ignoreClassWithStaticInitBlock: false,
                    reportUsedIgnorePattern: false,
                }),
                "no-use-before-define": WARN({
                    functions: true,
                    classes: true,
                    variables: true,
                    allowNamedExports: false,
                }),
                "no-useless-assignment": ERROR(),
                "no-useless-backreference": WARN(),
                "require-atomic-updates": ERROR({
                    allowProperties: false,
                }),
                "use-isnan": ERROR({
                    enforceForSwitchCase: true,
                    enforceForIndexOf: true,
                }),
                "valid-typeof": ERROR({ requireStringLiterals: true }),
            },
        },
        mergedOptions.base?.suggestions && {
            name: "Base suggestions",
            rules: {
                "accessor-pairs": OFF(),
                "arrow-body-style": OFF(),
                "block-scoped-var": OFF(),
                "camelcase": ERROR({
                    properties: "always",
                    ignoreDestructuring: false,
                    ignoreImports: true,
                    ignoreGlobals: false,
                // allow: ["^UNSAFE_"], @TODO say something about in the README & REACT
                }),
                "capitalized-comments": OFF(),
                "class-methods-use-this": OFF(),
                "complexity": OFF(),
                "consistent-return": OFF(),
                "consistent-this": OFF(),
                "curly": ERROR("all"),
                "default-case": OFF(),
                "default-case-last": ERROR(),
                "default-param-last": ERROR(),
                "dot-notation": ERROR({ allowKeywords: true, allowPattern: undefined }),
                "eqeqeq": ERROR("always", { null: "ignore" }),
                "func-name-matching": OFF(),
                "func-names": ERROR("as-needed"),
                "func-style": ERROR("expression"), // has overrides option but we don't use it
                "grouped-accessor-pairs": ERROR("getBeforeSet"),
                "guard-for-in": WARN(),
                "id-denylist": OFF(),
                "id-length": OFF(),
                "id-match": OFF(),
                "init-declarations": OFF(),
                "logical-assignment-operators": ERROR("never"),
                "max-classes-per-file": OFF(),
                "max-depth": ERROR({
                    max: 5,
                }),
                "max-lines": ERROR({
                    max: 200,
                    skipBlankLines: true,
                    skipComments: true,
                }),
                "max-lines-per-function": ERROR({
                    max: 50,
                    skipBlankLines: true, // these on 03.10.2018 are documented wrong @TODO suggest a fix
                    skipComments: true,
                    IIFEs: false,
                }),
                "max-nested-callbacks": OFF(), // max-depth will handle this
                "max-params": OFF(),
                "max-statements": ERROR({
                    max: 15,
                // ignoreTopLevelFunctions: false,
                }),
                "new-cap": WARN({
                    newIsCap: true,
                    capIsNew: true,
                    // newIsCapExceptions: undefined,
                    // newIsCapExceptionPattern: undefined,
                    // capIsNewExceptions: undefined,
                    // capIsNewExceptionPattern: undefined,
                    properties: true,
                }),
                "no-alert": OFF(),
                "no-array-constructor": ERROR(),
                "no-bitwise": OFF(),
                "no-caller": ERROR(),
                "no-case-declarations": OFF(),
                "no-console": ERROR({ allow: ["error", "info", "warn"] }),
                "no-continue": OFF(),
                "no-delete-var": ERROR(),
                "no-div-regex": OFF(),
                "no-else-return": ERROR({ allowElseIf: false }),
                "no-empty": WARN({ allowEmptyCatch: true }),
                "no-empty-function": ERROR({ allow: [] }),
                "no-empty-static-block": ERROR(),
                "no-eq-null": OFF(), // eqeqeq takes care of that anyway
                "no-eval": ERROR({ allowIndirect: false }),
                "no-extend-native": ERROR({ exceptions: [] }),
                "no-extra-bind": ERROR(),
                "no-extra-boolean-cast": ERROR({ enforceForInnerExpressions: true }),
                "no-extra-label": ERROR(),
                "no-global-assign": ERROR({ exceptions: [] }),
                // @TODO should disallowTemplateShorthand be true? one of ts rules asks for template strings instead of adding
                // things ⬇️
                "no-implicit-coercion": ERROR({
                    boolean: true, string: true, number: true, disallowTemplateShorthand: false, allow: [],
                }),
                "no-implicit-globals": ERROR({ lexicalBindings: false }), // @TODO something about making it true in README?
                "no-implied-eval": ERROR(),
                "no-inline-comments": OFF(),
                "no-invalid-this": ERROR(),
                "no-iterator": ERROR(),
                "no-label-var": ERROR(),
                "no-labels": OFF(),
                "no-lone-blocks": OFF(),
                "no-lonely-if": OFF(),
                "no-loop-func": ERROR(),
                "no-magic-numbers": ERROR({
                    ignore: [0, 1],
                    ignoreArrayIndexes: true,
                    ignoreDefaultValues: false,
                    ignoreClassFieldInitialValues: false,
                    enforceConst: false,
                    detectObjects: false,
                }),
                "no-multi-assign": OFF(),
                "no-multi-str": WARN(),
                "no-negated-condition": OFF(),
                "no-nested-ternary": OFF(),
                "no-new": ERROR(),
                "no-new-func": ERROR(),
                "no-new-wrappers": ERROR(),
                "no-nonoctal-decimal-escape": ERROR(),
                "no-object-constructor": ERROR(),
                "no-octal": ERROR(),
                "no-octal-escape": ERROR(),
                "no-param-reassign": ERROR({
                    props: true,
                    ignorePropertyModificationsFor: [],
                // ignorePropertyModificationsForRegex: //,
                }),
                "no-plusplus": OFF(),
                "no-proto": ERROR(),
                "no-redeclare": ERROR({ builtinGlobals: true }),
                "no-regex-spaces": ERROR(),
                "no-restricted-exports": OFF(),
                "no-restricted-globals": OFF(), // @TODO we can use this to prevent fdescribe or stuff, verify
                "no-restricted-imports": OFF(),
                "no-restricted-properties": OFF(),
                "no-restricted-syntax": OFF(),
                "no-return-assign": ERROR("except-parens"),
                "no-script-url": OFF(),
                "no-sequences": WARN({ allowInParentheses: true }),
                "no-shadow": ERROR({
                    builtinGlobals: true,
                    hoist: "all",
                    ignoreOnInitialization: true,
                    allow: [],
                }),
                "no-shadow-restricted-names": ERROR(),
                "no-ternary": OFF(),
                "no-throw-literal": ERROR(),
                "no-undef-init": OFF(), // init-declarations should take care of this anyway
                "no-undefined": OFF(), // no-redeclare will guard for shadowing, ES5 disallows to overwrite global
                "no-underscore-dangle": OFF(),
                "no-unneeded-ternary": ERROR({ defaultAssignment: true }),
                "no-unused-expressions": ERROR({
                    allowShortCircuit: true,
                    allowTernary: false,
                    allowTaggedTemplates: false,
                    enforceForJSX: true,
                }),
                "no-unused-labels": ERROR(), // @TODO put on a list to disable in tests
                "no-useless-call": OFF(),
                "no-useless-catch": ERROR(),
                "no-useless-computed-key": ERROR({ enforceForClassMembers: true }),
                "no-useless-concat": ERROR(),
                "no-useless-constructor": ERROR(),
                "no-useless-escape": ERROR(),
                "no-useless-rename": ERROR({
                    ignoreImport: false,
                    ignoreExport: false,
                    ignoreDestructuring: false,
                }),
                "no-useless-return": ERROR(),
                "no-var": ERROR(),
                "no-void": ERROR({ allowAsStatement: false }),
                "no-warning-comments": ERROR({
                    terms: ["FIXME", "@fixme"],
                    location: "anywhere",
                }),
                "no-with": ERROR(),
                "object-shorthand": ERROR("consistent-as-needed"),
                "one-var": ERROR({
                    var: "consecutive",
                    let: "consecutive",
                    const: "never",
                }),
                "operator-assignment": OFF(),
                "prefer-arrow-callback": OFF(),
                "prefer-const": ERROR({
                    destructuring: "any",
                    ignoreReadBeforeAssign: true,
                }),
                "prefer-destructuring": OFF(),
                "prefer-exponentiation-operator": OFF(),
                "prefer-named-capture-group": OFF(),
                "prefer-numeric-literals": ERROR(),
                "prefer-object-has-own": OFF(), // @TODO enable around 2025
                "prefer-object-spread": ERROR(),
                "prefer-promise-reject-errors": ERROR({ allowEmptyReject: false }),
                "prefer-regex-literals": ERROR({ disallowRedundantWrapping: true }),
                "prefer-rest-params": ERROR(),
                "prefer-spread": ERROR(),
                "prefer-template": OFF(),
                "radix": ERROR("always"),
                "require-await": WARN(),
                "require-unicode-regexp": ERROR(),
                "require-yield": WARN(),
                "sort-imports": OFF(),
                "sort-keys": OFF(), // @TODO contrubute to docs and write about performance of varying keys order
                "sort-vars": OFF(),
                "strict": ERROR("safe"),
                "symbol-description": WARN(),
                "vars-on-top": ERROR(),
                "yoda": ERROR("never"),
            },
        },
        mergedOptions.node && {
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
        },
        mergedOptions.base?.deprecated && {
            name: "Base deprecated",
            rules: {
                "no-return-await": ERROR(),
            },
        },
        mergedOptions.base?.types && {
            name: "Base pure typescript",
            plugins: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
                "@typescript-eslint": typescript as any,
            },
            rules: {
                "@typescript-eslint/adjacent-overload-signatures": ERROR(),
                "@typescript-eslint/array-type": ERROR({ default: "array" }),
                "@typescript-eslint/await-thenable": WARN(),
                "@typescript-eslint/ban-ts-comment": ERROR({
                    "ts-expect-error": "allow-with-description",
                    "ts-ignore": "allow-with-description",
                    "ts-nocheck": "allow-with-description",
                    "ts-check": false,
                    "minimumDescriptionLength": 10,
                }),
                "@typescript-eslint/ban-tslint-comment": OFF(),
                "@typescript-eslint/ban-types": ERROR({
                    types: {
                        object: false,
                    },
                    extendDefaults: true,
                }),
                "@typescript-eslint/class-literal-property-style": WARN("fields"), // @TODO needs verification in real life
                "@typescript-eslint/consistent-generic-constructors": ERROR("constructor"),
                "@typescript-eslint/consistent-indexed-object-style": OFF(), // the syntaxes mean different things
                "@typescript-eslint/consistent-type-assertions": ERROR({
                    assertionStyle: "as",
                    objectLiteralTypeAssertions: "never",
                }),
                "@typescript-eslint/consistent-type-definitions": OFF(), // syntaxes mean different things
                "@typescript-eslint/consistent-type-exports": ERROR({
                    fixMixedExportsWithInlineTypeSpecifier: false,
                }),
                "@typescript-eslint/consistent-type-imports": ERROR({
                    prefer: "type-imports",
                    fixStyle: "separate-type-imports",
                    disallowTypeAnnotations: true,
                }),
                "@typescript-eslint/explicit-function-return-type": OFF(),
                "@typescript-eslint/explicit-member-accessibility": ERROR({ accessibility: "explicit" }), // @TODO consider no-public?
                "@typescript-eslint/explicit-module-boundary-types": OFF(),
                "@typescript-eslint/member-ordering": OFF(), // @TODO looks useful, but takes a lot of time to configure
                "@typescript-eslint/method-signature-style": ERROR("property"),
                "@typescript-eslint/naming-convention": OFF(), // @TODO this is an advanced "camelcase", looks useful
                "@typescript-eslint/no-array-delete": WARN(),
                "@typescript-eslint/no-base-to-string": ERROR({ ignoredTypeNames: [] }),
                "@typescript-eslint/no-confusing-non-null-assertion": ERROR(),
                "@typescript-eslint/no-confusing-void-expression": ERROR({
                    ignoreArrowShorthand: false,
                    ignoreVoidOperator: false,
                }),
                "@typescript-eslint/no-duplicate-enum-values": ERROR(),
                "@typescript-eslint/no-duplicate-type-constituents": ERROR(),
                "@typescript-eslint/no-dynamic-delete": ERROR(),
                "@typescript-eslint/no-empty-interface": OFF(),
                "@typescript-eslint/no-explicit-any": WARN({
                    fixToUnknown: false,
                    ignoreRestArgs: false,
                }),
                "@typescript-eslint/no-extra-non-null-assertion": ERROR(),
                "@typescript-eslint/no-extraneous-class": WARN({
                    allowConstructorOnly: false,
                    allowEmpty: false,
                    allowStaticOnly: false,
                    allowWithDecorator: false,
                }),
                "@typescript-eslint/no-floating-promises": WARN({
                    ignoreVoid: true,
                    ignoreIIFE: false,
                }),
                "@typescript-eslint/no-for-in-array": ERROR(),
                "@typescript-eslint/no-import-type-side-effects": ERROR(),
                // "@typescript-eslint/no-implicit-any-catch": ERROR( { // TODO what happened to that rule?
                //     allowExplicitAny: false,
                // }),
                "@typescript-eslint/no-inferrable-types": OFF({ // @TODO test later on large code how it behaves
                    ignoreParameters: false,
                    ignoreProperties: false,
                }),
                "@typescript-eslint/no-invalid-void-type": WARN({ // @TODO needs verification
                    allowInGenericTypeArguments: true,
                    allowAsThisParameter: false,
                }),
                "@typescript-eslint/no-meaningless-void-operator": OFF(),
                "@typescript-eslint/no-misused-new": WARN(),
                "@typescript-eslint/no-misused-promises": ERROR({
                    checksVoidReturn: true,
                    checksConditionals: true,
                }),
                "@typescript-eslint/no-mixed-enums": ERROR(),
                "@typescript-eslint/no-namespace": ERROR({
                    allowDeclarations: false,
                    allowDefinitionFiles: true,
                }),
                "@typescript-eslint/no-new-symbol": OFF(), // deprecated
                "@typescript-eslint/no-non-null-asserted-nullish-coalescing": ERROR(),
                "@typescript-eslint/no-non-null-asserted-optional-chain": ERROR(),
                "@typescript-eslint/no-non-null-assertion": OFF(),
                "@typescript-eslint/no-parameter-properties": OFF(),
                "@typescript-eslint/no-redundant-type-constituents": WARN(),
                "@typescript-eslint/no-require-imports": WARN({ allow: [] }),
                "@typescript-eslint/no-this-alias": OFF({
                    allowDestructuring: true,
                    allowedNames: ["self"],
                }),
                "@typescript-eslint/no-type-alias": OFF(), // @TODO useful but time consuming to consider everything? deprecated in v6, removed in v7?
                "@typescript-eslint/no-unnecessary-boolean-literal-compare": OFF(),
                "@typescript-eslint/no-unnecessary-condition": WARN({
                    allowConstantLoopConditions: false,
                    allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
                }),
                "@typescript-eslint/no-unnecessary-qualifier": ERROR(), // @TODO verify if useful for enums? actually we probably want the opposite, see prefer-literal-enum-member docs
                "@typescript-eslint/no-unnecessary-type-arguments": WARN(), // @TODO to decide
                "@typescript-eslint/no-unnecessary-type-assertion": ERROR(),
                "@typescript-eslint/no-unnecessary-type-constraint": ERROR(),
                "@typescript-eslint/no-unsafe-argument": ERROR(),
                "@typescript-eslint/no-unsafe-assignment": ERROR(),
                "@typescript-eslint/no-unsafe-call": ERROR(),
                "@typescript-eslint/no-unsafe-declaration-merging": ERROR(),
                "@typescript-eslint/no-unsafe-enum-comparison": ERROR(),
                "@typescript-eslint/no-unsafe-member-access": ERROR(),
                "@typescript-eslint/no-unsafe-return": ERROR(),
                "@typescript-eslint/no-unsafe-unary-minus": ERROR(),
                "@typescript-eslint/no-useless-empty-export": WARN(),
                "@typescript-eslint/no-useless-template-literals": WARN(),
                "@typescript-eslint/no-var-requires": ERROR({ allow: [] }),
                "@typescript-eslint/non-nullable-type-assertion-style": OFF(),
                "@typescript-eslint/parameter-properties": ERROR({
                    // allow: [],
                    prefer: "class-property",
                }),
                "@typescript-eslint/prefer-as-const": OFF(),
                "@typescript-eslint/prefer-enum-initializers": OFF(),
                "@typescript-eslint/prefer-find": ERROR(),
                "@typescript-eslint/prefer-for-of": OFF(),
                "@typescript-eslint/prefer-function-type": OFF(),
                "@typescript-eslint/prefer-includes": WARN(),
                "@typescript-eslint/prefer-literal-enum-member": WARN(),
                "@typescript-eslint/prefer-namespace-keyword": ERROR(), // should not be used in ES2015+ automatically
                "@typescript-eslint/prefer-nullish-coalescing": OFF({ // annoying
                    ignoreConditionalTests: true,
                    ignoreMixedLogicalExpressions: true,
                }),
                "@typescript-eslint/prefer-optional-chain": ERROR(),
                "@typescript-eslint/prefer-readonly": ERROR({
                    onlyInlineLambdas: false,
                }),
                "@typescript-eslint/prefer-readonly-parameter-types": OFF(), // no-param-reassign will take care of that
                "@typescript-eslint/prefer-reduce-type-parameter": ERROR(),
                "@typescript-eslint/prefer-regexp-exec": WARN(),
                "@typescript-eslint/prefer-return-this-type": OFF(), // ts handles it already
                "@typescript-eslint/prefer-string-starts-ends-with": ERROR({ allowSingleElementEquality: "always" }),
                "@typescript-eslint/prefer-ts-expect-error": ERROR(),
                "@typescript-eslint/promise-function-async": OFF({
                    allowAny: true,
                    allowedPromiseNames: [],
                    checkArrowFunctions: true,
                    checkFunctionDeclarations: true,
                    checkFunctionExpressions: true,
                    checkMethodDeclarations: true,
                }),
                "@typescript-eslint/require-array-sort-compare": WARN({
                    ignoreStringArrays: true,
                }),
                "@typescript-eslint/restrict-plus-operands": ERROR({
                    allowAny: false,
                    allowBoolean: false,
                    allowNullish: false,
                    allowNumberAndString: false,
                    allowRegExp: false,
                    skipCompoundAssignments: false,
                }),
                "@typescript-eslint/restrict-template-expressions": ERROR({
                    allowNumber: true,
                    allowBoolean: false,
                    allowAny: false,
                    allowArray: false,
                    allowNullish: false,
                    allowRegExp: false,
                    allowNever: false,
                }),
                "@typescript-eslint/sort-type-union-intersection-members": OFF(),
                "@typescript-eslint/strict-boolean-expressions": OFF({
                    allowString: true,
                    allowNumber: true,
                    allowNullableObject: true,
                    allowNullableBoolean: false,
                    allowNullableString: false,
                    allowNullableNumber: false,
                    allowNullableEnum: false,
                    allowAny: false,
                    allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
                }),
                "@typescript-eslint/switch-exhaustiveness-check": OFF(), // not that useful and may be slow
                "@typescript-eslint/triple-slash-reference": WARN({
                    path: "never",
                    types: "never",
                    lib: "never",
                }),
                // "@typescript-eslint/type-annotation-spacing": ERROR(),
                "@typescript-eslint/typedef": WARN(), // @TODO just to try, but seems not needed at all
                "@typescript-eslint/unbound-method": WARN({
                    ignoreStatic: true,
                }),
                "@typescript-eslint/unified-signatures": WARN({
                    ignoreDifferentlyNamedParameters: true,
                }),
                "@typescript-eslint/use-unknown-in-catch-callback-variable": ERROR(),
            },
        },
        mergedOptions.base?.types && {
            name: "Base typescript that requires disabling non-ts rules",
            rules: {
                "class-methods-use-this": OFF(),
                "@typescript-eslint/class-methods-use-this": OFF(),

                "consistent-return": OFF(),
                "@typescript-eslint/consistent-return": OFF(),

                "default-param-last": OFF(),
                "@typescript-eslint/default-param-last": ERROR(),

                "dot-notation": OFF(),
                "@typescript-eslint/dot-notation": ERROR({
                    allowKeywords: true,
                    allowPattern: undefined,
                    allowPrivateClassPropertyAccess: false,
                    allowProtectedClassPropertyAccess: false,
                }),

                "init-declarations": OFF(),
                "@typescript-eslint/init-declarations": OFF(), // keep off

                "no-array-constructor": OFF(),
                "@typescript-eslint/no-array-constructor": ERROR(),

                "no-dupe-class-members": OFF(),
                "@typescript-eslint/no-dupe-class-members": ERROR(),

                "no-empty-function": OFF(),
                "@typescript-eslint/no-empty-function": ERROR({ allow: [] }), // TODO maybe add private-constructors and protected-constructors?

                "no-implied-eval": OFF(),
                "@typescript-eslint/no-implied-eval": ERROR(),

                "no-invalid-this": OFF(),
                "@typescript-eslint/no-invalid-this": ERROR({ capIsConstructor: true }),

                "no-loop-func": OFF(),
                "@typescript-eslint/no-loop-func": ERROR(),

                "no-loss-of-precision": OFF(),
                "@typescript-eslint/no-loss-of-precision": ERROR(),

                "no-magic-numbers": OFF(),
                "@typescript-eslint/no-magic-numbers": ERROR({
                    ignore: [0, 1],
                    ignoreArrayIndexes: true,
                    ignoreDefaultValues: false,
                    enforceConst: false,
                    detectObjects: false,
                    ignoreEnums: true,
                    ignoreNumericLiteralTypes: true,
                    ignoreReadonlyClassProperties: true,
                    ignoreTypeIndexes: true,
                }),

                "no-redeclare": OFF(),
                "@typescript-eslint/no-redeclare": ERROR({ builtinGlobals: true, ignoreDeclarationMerge: false }),

                "no-shadow": OFF(),
                "@typescript-eslint/no-shadow": ERROR({
                    builtinGlobals: true,
                    hoist: "all",
                    ignoreOnInitialization: true,
                    allow: [],
                    ignoreTypeValueShadow: false,
                    ignoreFunctionTypeParameterNameValueShadow: false,
                }),

                "no-throw-literal": OFF(),
                "@typescript-eslint/no-throw-literal": OFF(), // deprecated in favor of only-throw-error
                "@typescript-eslint/only-throw-error": ERROR({
                    allowThrowingAny: false,
                    allowThrowingUnknown: false,
                }),

                "no-unused-expressions": OFF(),
                "@typescript-eslint/no-unused-expressions": ERROR({
                    allowShortCircuit: true,
                    allowTernary: false,
                    allowTaggedTemplates: false,
                    enforceForJSX: true,
                }),

                "no-unused-vars": OFF(),
                "@typescript-eslint/no-unused-vars": ERROR({
                    vars: "all",
                    varsIgnorePattern: undefined,
                    args: "none",
                    argsIgnorePattern: undefined,
                    caughtErrors: "all", // can omit `(error)` otherwise
                    caughtErrorsIgnorePattern: undefined,
                    destructuredArrayIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                    // ignoreClassWithStaticInitBlock: false, - these two are not supported in ts
                    // reportUsedIgnorePattern: false,
                }),

                "no-use-before-define": OFF(),
                "@typescript-eslint/no-use-before-define": WARN({
                    functions: true,
                    classes: true,
                    variables: true,
                    allowNamedExports: false,
                    enums: true,
                    typedefs: true,
                    ignoreTypeReferences: false,
                }),

                "no-useless-constructor": OFF(),
                "@typescript-eslint/no-useless-constructor": ERROR(),

                "require-await": OFF(),
                "@typescript-eslint/require-await": WARN(),

                "no-return-await": OFF(),
                "@typescript-eslint/return-await": ERROR("in-try-catch"),

                "no-restricted-imports": OFF(),
                "@typescript-eslint/no-restricted-imports": OFF(),

                "prefer-destructuring": OFF(),
                "@typescript-eslint/prefer-destructuring": OFF(),

                "prefer-promise-reject-errors": OFF(),
                "@typescript-eslint/prefer-promise-reject-errors": ERROR({ allowEmptyReject: false }),
            },
        },
        mergedOptions.base?.types && {
            name: "Rules that are not needed in typescript",
            rules: {
                "no-duplicate-imports": OFF(), // this is broken with TS, it marks `import` & `import type` as duplicate
                "no-new-native-nonconstructor": OFF(),
                // consistent-return (already turned off)
            },
        },
        mergedOptions.react && {
            name: "React/JSX - JSX related",
            plugins: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
                react: fixupPluginRules(react) as any,
            },
            settings: {
                react: {
                    version: "detect",
                },
            },
            rules: {
                "react/jsx-boolean-value": ERROR("always", { assumeUndefinedIsFalse: false }), // the option works with never only
                "react/jsx-filename-extension": OFF(),
                "react/jsx-fragments": ERROR("syntax"),
                "react/jsx-handler-names": OFF(),
                "react/jsx-key": ERROR({
                    checkFragmentShorthand: true,
                    checkKeyMustBeforeSpread: true,
                    warnOnDuplicates: true,
                }),
                "react/jsx-max-depth": WARN({
                    max: 10,
                }),
                "react/jsx-no-bind": ERROR({
                    ignoreDOMComponents: false,
                    ignoreRefs: false,
                    allowArrowFunctions: false,
                    allowFunctions: false,
                    allowBind: false,
                }),
                "react/jsx-no-comment-textnodes": OFF(),
                "react/jsx-no-constructed-context-values": ERROR(),
                "react/jsx-no-duplicate-props": ERROR({
                    ignoreCase: false,
                }),
                "react/jsx-no-leaked-render": ERROR({
                    validStrategies: ["coerce", "ternary"],
                }),
                "react/jsx-no-literals": OFF(),
                "react/jsx-no-script-url": ERROR(), // default config left out here - too noisy, default it good
                "react/jsx-no-target-blank": ERROR({
                    allowReferrer: false,
                    enforceDynamicLinks: "always",
                    warnOnSpreadAttributes: false,
                    links: true,
                    forms: true,
                }),
                "react/jsx-no-undef": OFF(), // ERROR( { allowGlobals: false }), TODO - that when no typescript - when flat config is ready
                "react/jsx-no-useless-fragment": OFF(),
                "react/jsx-props-no-spreading": OFF(),
                "react/jsx-sort-default-props": OFF(), // deprecated, use react/sort-default-props
                "react/jsx-space-before-closing": OFF(), // deprecated, use react/jsx-tag-spacing
                "react/jsx-uses-react": ERROR(), // TODO disable when new jsx transform via flat config
                "react/jsx-uses-vars": ERROR(),
            },
        },
        mergedOptions.react && {
            name: "React/JSX - code style",
            rules: {
                "react/boolean-prop-naming": OFF(),
                "react/button-has-type": OFF(),
                "react/checked-requires-onchange-or-readonly": WARN(),
                "react/default-props-match-prop-types": ERROR({
                    allowRequiredDefaults: false,
                }),
                "react/destructuring-assignment": OFF(),
                "react/display-name": ERROR({
                    ignoreTranspilerName: false,
                    checkContextObjects: true,
                }),
                "react/forbid-component-props": OFF(),
                "react/forbid-dom-props": OFF(),
                "react/forbid-elements": OFF(),
                "react/forbid-foreign-prop-types": ERROR({ allowInPropTypes: false }),
                "react/forbid-prop-types": OFF(),
                "react/function-component-definition": ERROR({
                    namedComponents: "arrow-function",
                    unnamedComponents: "arrow-function",
                }),
                "react/hook-use-state": OFF(),
                "react/iframe-missing-sandbox": ERROR(),
                "react/no-access-state-in-setstate": ERROR(),
                "react/no-adjacent-inline-elements": OFF(),
                "react/no-array-index-key": WARN(),
                "react/no-arrow-function-lifecycle": ERROR(),
                "react/no-children-prop": WARN({ allowFunctions: true }),
                "react/no-danger-with-children": ERROR(),
                "react/no-danger": OFF(),
                "react/no-deprecated": WARN(),
                "react/no-did-mount-set-state": ERROR("disallow-in-func"),
                "react/no-did-update-set-state": ERROR("disallow-in-func"),
                "react/no-direct-mutation-state": ERROR(),
                "react/no-find-dom-node": ERROR(),
                "react/no-invalid-html-attribute": ERROR(["rel"]),
                "react/no-is-mounted": ERROR(),
                "react/no-multi-comp": WARN({ ignoreStateless: false }),
                "react/no-namespace": ERROR(),
                "react/no-object-type-as-default-prop": ERROR(),
                "react/no-redundant-should-component-update": ERROR(),
                "react/no-render-return-value": ERROR(),
                "react/no-set-state": OFF(),
                "react/no-string-refs": ERROR({
                    noTemplateLiterals: true,
                }),
                "react/no-this-in-sfc": ERROR(), // @TODO disable on typescript in flat config
                "react/no-typos": ERROR(),
                "react/no-unescaped-entities": OFF(),
                "react/no-unknown-property": ERROR({ ignore: [], requireDataLowercase: true }),
                "react/no-unsafe": ERROR({
                    checkAliases: true,
                }),
                "react/no-unstable-nested-components": ERROR({
                    allowAsProps: false,
                    customValidators: [],
                }),
                "react/no-unused-class-component-methods": ERROR(),
                "react/no-unused-prop-types": WARN({
                    ignore: [],
                    customValidators: [],
                    skipShapeProps: true,
                }),
                "react/no-unused-state": ERROR(),
                "react/no-will-update-set-state": ERROR(),
                "react/prefer-es6-class": ERROR("always"),
                "react/prefer-exact-props": OFF(),
                "react/prefer-read-only-props": OFF(), // flow only
                "react/prefer-stateless-function": ERROR({
                    ignorePureComponents: false,
                }),
                "react/prop-types": ERROR({
                    ignore: [],
                    customValidators: [],
                    skipUndeclared: false,
                }),
                "react/react-in-jsx-scope": ERROR(), // TODO allow to disable with flat config
                "react/require-default-props": OFF(),
                "react/require-optimization": OFF(),
                "react/require-render-return": ERROR(),
                "react/self-closing-comp": OFF(), // replaced by stylistic
                "react/sort-comp": ERROR({
                    // order: [],
                    // groups: {}
                }),
                "react/sort-default-props": ERROR({
                    ignoreCase: true,
                }),
                "react/sort-prop-types": ERROR({
                    ignoreCase: true,
                    callbacksLast: true,
                    requiredFirst: true,
                    sortShapeProp: true,
                    noSortAlphabetically: false,
                }),
                "react/state-in-constructor": OFF(),
                "react/static-property-placement": ERROR("property assignment"),
                "react/style-prop-object": ERROR(),
                "react/void-dom-elements-no-children": ERROR(),
            },
        },
        mergedOptions.import && {
            name: "Import - static analysis",
            plugins: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
                import: fixupPluginRules(importPlugin) as any,
            },
            settings: {
                "import/ignore": ["\\.(scss|saas|less|css|jpg|jpeg|gif|png|webm|webp|svg|ttf|woff|woff2)$"],
            },
            rules: {
                "import/no-unresolved": OFF(),
                "import/named": ERROR(),
                "import/default": ERROR(),
                "import/namespace": ERROR(),
                "import/no-restricted-paths": OFF(),
                "import/no-absolute-path": ERROR(),
                "import/no-dynamic-require": OFF(),
                "import/no-internal-modules": OFF(),
                "import/no-webpack-loader-syntax": OFF(),
                "import/no-self-import": ERROR(),
                "import/no-cycle": ERROR({
                    // maxDepth: 0 - don't use until linting goes slow
                    ignoreExternal: true,
                    allowUnsafeDynamicCyclicDependency: false,
                }),
                "import/no-useless-path-segments": ERROR({
                    noUselessIndex: false,
                    commonjs: false, // false by default, check if true will leave support for import syntax @TODO
                }),
                "import/no-relative-parent-imports": OFF(),
                "import/no-relative-packages": OFF(),
                "import/no-empty-named-blocks": ERROR(),
                "import/consistent-type-specifier-style": ERROR(),
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
                "import/order": ERROR({
                    "groups": [
                        "builtin", "external", "type", "internal", "parent", "sibling", "index", "object", "unknown",
                    ],
                    "pathGroups": [
                        {
                            pattern: "react",
                            group: "builtin",
                            position: "before",
                        },
                        {
                            pattern: "*.{css,scss}",
                            group: "unknown",
                            patternOptions: { matchBase: true },
                            position: "before",
                        },
                    ],
                    "distinctGroup": true,
                    "pathGroupsExcludedImportTypes": ["react"],
                    "newlines-between": "always",
                    "warnOnUnassignedImports": true,
                    "alphabetize": undefined,
                }),
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

// TODO add https://www.npmjs.com/package/eslint-plugin-jsdoc

// TODO look through deprecated

/**
 * Gets just the rules that you should disable in the test files, because they are not relevant or annoying.
 */
const getTestsDisabledRules = () => {
    return {};
};

export {
    getEslintConfig,
    getTestsDisabledRules,
};
