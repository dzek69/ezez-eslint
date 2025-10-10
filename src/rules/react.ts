import react from "@ezez/_eslint-plugin-react";
import { truthy } from "@ezez/utils";

import type { Linter } from "eslint";
import type { MergedOptions } from "../types.js";

import { ERROR, OFF, WARN } from "./_states.js";

const get = (mergedOptions: MergedOptions): Linter.Config[] => {
    const shouldEnable = mergedOptions.react === true || (
        typeof mergedOptions.react === "object" && mergedOptions.react.base
    );

    return [
        shouldEnable && {
            name: "React/JSX - JSX related",
            plugins: {
                react,
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
                "react/jsx-props-no-spread-multi": ERROR(),
                "react/jsx-sort-default-props": OFF(), // deprecated, use react/sort-default-props
                "react/jsx-space-before-closing": OFF(), // deprecated, use react/jsx-tag-spacing
                "react/jsx-uses-react": ERROR(), // TODO disable when new jsx transform via flat config
                "react/jsx-uses-vars": ERROR(),
            },
        },
        shouldEnable && {
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
                "react/forward-ref-uses-ref": ERROR(),
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
                    // propNamePattern: "", (allows render* by default)
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
    ].filter(truthy);
};

export {
    get,
};
