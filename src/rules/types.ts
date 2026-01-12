import typescript from "@ezez/__typescript-eslint__eslint-plugin";
import { truthy } from "@ezez/utils";

import type { Linter } from "eslint";
import type { MergedOptions } from "../types.js";

import { ERROR, OFF, WARN } from "./_states.js";

const get = (mergedOptions: MergedOptions): Linter.Config[] => {
    return [
        mergedOptions.base?.types && {
            name: "Base pure typescript",
            plugins: {
                "@typescript-eslint": typescript as never,
            },
            rules: {
                "@typescript-eslint/adjacent-overload-signatures": ERROR(),
                "@typescript-eslint/array-type": WARN({ default: "array-simple" }),
                "@typescript-eslint/await-thenable": WARN(),
                "@typescript-eslint/ban-ts-comment": ERROR({
                    // descriptionFormat
                    "ts-expect-error": "allow-with-description",
                    "ts-ignore": true,
                    "ts-nocheck": "allow-with-description",
                    "ts-check": false,
                    "minimumDescriptionLength": 10,
                }),
                "@typescript-eslint/ban-tslint-comment": OFF(),
                "@typescript-eslint/class-literal-property-style": WARN("fields"), // @TODO needs verification in real life
                "@typescript-eslint/consistent-generic-constructors": ERROR("constructor"),
                "@typescript-eslint/consistent-indexed-object-style": OFF(), // the syntaxes mean different things
                "@typescript-eslint/consistent-type-assertions": ERROR({
                    assertionStyle: "as",
                    objectLiteralTypeAssertions: "never",
                    arrayLiteralTypeAssertions: "never",
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
                "@typescript-eslint/no-base-to-string": ERROR({ ignoredTypeNames: [], checkUnknown: true }),
                "@typescript-eslint/no-confusing-non-null-assertion": ERROR(),
                "@typescript-eslint/no-confusing-void-expression": ERROR({
                    ignoreArrowShorthand: false,
                    ignoreVoidOperator: false,
                    ignoreVoidReturningFunctions: false,
                }),
                "@typescript-eslint/no-deprecated": OFF(),
                "@typescript-eslint/no-duplicate-enum-values": ERROR(),
                "@typescript-eslint/no-duplicate-type-constituents": ERROR(),
                "@typescript-eslint/no-dynamic-delete": ERROR(),
                "@typescript-eslint/no-empty-object-type": ERROR({
                    allowInterfaces: "with-single-extends",
                    allowObjectTypes: "never",
                }),
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
                    checkThenables: false,
                    ignoreVoid: true,
                    ignoreIIFE: false,
                    allowForKnownSafePromises: [],
                    allowForKnownSafeCalls: [],
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
                "@typescript-eslint/no-misused-spread": ERROR({ allow: [] }),
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
                "@typescript-eslint/no-restricted-types": OFF(), // TODO should be easy to configure via options
                "@typescript-eslint/no-require-imports": WARN({ allow: [] }),
                "@typescript-eslint/no-this-alias": OFF({
                    allowDestructuring: true,
                    allowedNames: ["self"],
                }),
                "@typescript-eslint/no-type-alias": OFF(), // @TODO useful but time consuming to consider everything? deprecated in v6, removed in v7?
                "@typescript-eslint/no-unnecessary-boolean-literal-compare": OFF(),
                "@typescript-eslint/no-unnecessary-condition": WARN({
                    allowConstantLoopConditions: false,
                    checkTypePredicates: true, // TODO maybe it should be false? this whole rule seems annoying
                    allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
                }),
                "@typescript-eslint/no-unnecessary-qualifier": ERROR(), // @TODO verify if useful for enums? actually we probably want the opposite, see prefer-literal-enum-member docs
                "@typescript-eslint/no-unnecessary-parameter-property-assignment": OFF(),
                "@typescript-eslint/no-unnecessary-template-expression": WARN(), // renamed from no-useless-template-literals
                "@typescript-eslint/no-unnecessary-type-arguments": WARN(), // @TODO to decide
                "@typescript-eslint/no-unnecessary-type-assertion": ERROR({
                    checkLiteralConstAssertions: false,
                    typesToIgnore: [],
                }),
                "@typescript-eslint/no-unnecessary-type-constraint": ERROR(),
                "@typescript-eslint/no-unnecessary-type-conversion": ERROR(),
                "@typescript-eslint/no-unnecessary-type-parameters": OFF(), // @TODO may be useful? test on real code first
                "@typescript-eslint/no-unsafe-argument": ERROR(),
                "@typescript-eslint/no-unsafe-assignment": ERROR(),
                "@typescript-eslint/no-unsafe-call": ERROR(),
                "@typescript-eslint/no-unsafe-declaration-merging": ERROR(),
                "@typescript-eslint/no-unsafe-enum-comparison": ERROR(),
                "@typescript-eslint/no-unsafe-function-type": ERROR(),
                "@typescript-eslint/no-unsafe-member-access": ERROR({
                    allowOptionalChaining: true,
                }),
                "@typescript-eslint/no-unsafe-return": ERROR(),
                "@typescript-eslint/no-unsafe-type-assertion": OFF(), // this is annoying, in a clean codebase all type assertions are unsafe by nature
                "@typescript-eslint/no-unsafe-unary-minus": ERROR(),
                "@typescript-eslint/no-useless-empty-export": WARN(),
                "@typescript-eslint/no-var-requires": ERROR({ allow: [] }),
                "@typescript-eslint/no-wrapper-object-types": ERROR(),
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
                "@typescript-eslint/prefer-nullish-coalescing": OFF(), // annoying
                "@typescript-eslint/prefer-optional-chain": ERROR(),
                "@typescript-eslint/prefer-readonly": ERROR({
                    onlyInlineLambdas: false,
                }),
                "@typescript-eslint/prefer-readonly-parameter-types": OFF(), // no-param-reassign will take care of that
                "@typescript-eslint/prefer-reduce-type-parameter": ERROR(),
                "@typescript-eslint/prefer-regexp-exec": WARN(),
                "@typescript-eslint/prefer-return-this-type": OFF(), // ts handles it already
                "@typescript-eslint/prefer-string-starts-ends-with": ERROR({ allowSingleElementEquality: "always" }),
                "@typescript-eslint/prefer-ts-expect-error": OFF(), // deprecated
                "@typescript-eslint/promise-function-async": OFF({
                    allowAny: true,
                    allowedPromiseNames: [],
                    checkArrowFunctions: true,
                    checkFunctionDeclarations: true,
                    checkFunctionExpressions: true,
                    checkMethodDeclarations: true,
                }),
                "@typescript-eslint/related-getter-setter-pairs": WARN(),
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
                    allow: [], // TODO expose this to config?
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

                "max-params": OFF(),
                "@typescript-eslint/max-params": OFF(), // keep off

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

                // This rule is deprecated, the base rule gained all its functionality
                // "no-loss-of-precision": OFF(),
                "@typescript-eslint/no-loss-of-precision": OFF(),

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
                    allow: mergedOptions.config!.allowShadow ?? [],
                    ignoreTypeValueShadow: false,
                    ignoreFunctionTypeParameterNameValueShadow: false,
                }),

                "no-throw-literal": OFF(),
                "@typescript-eslint/no-throw-literal": OFF(), // removed in favor of only-throw-error
                "@typescript-eslint/only-throw-error": ERROR({
                    allow: [],
                    allowRethrowing: false,
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
                    ignoreClassWithStaticInitBlock: false,
                    reportUsedIgnorePattern: false,
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
                "@typescript-eslint/prefer-promise-reject-errors": ERROR({
                    allowEmptyReject: false,
                    allowThrowingAny: false,
                    allowThrowingUnknown: false,
                }),
            },
        },
        mergedOptions.base?.types && {
            name: "Base rules that are not needed in typescript",
            rules: {
                "no-new-native-nonconstructor": OFF(),
                // consistent-return (already turned off)
            },
        },
    ].filter(truthy);
};

export {
    get,
};
