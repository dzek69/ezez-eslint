import stylistic from "@stylistic/eslint-plugin";
import { truthy } from "@ezez/utils";

import type { MergedOptions } from "../types.js";
import type { Linter } from "eslint";

import { ERROR, OFF } from "./_states.js";

const get = (mergedOptions: MergedOptions): Linter.FlatConfig[] => {
    return [
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
                "@stylistic/indent": ERROR(mergedOptions.config.indent, {
                    SwitchCase: 1,
                }),
                "@stylistic/indent-binary-ops": ERROR(mergedOptions.config.indent),
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
                    tabWidth: mergedOptions.config.indent,
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
                "@stylistic/jsx-indent": ERROR(mergedOptions.config.indent, {
                    checkAttributes: true,
                    indentLogicalExpressions: true,
                }),
                "@stylistic/jsx-indent-props": ERROR({
                    indentMode: mergedOptions.config.indent,
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
    ].filter(truthy);
};

export {
    get,
};
