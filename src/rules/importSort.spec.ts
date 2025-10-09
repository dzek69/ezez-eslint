import { REGEX_REACT_LIBS, REGEX_REACT_LIBS_NOT_TYPES } from "./importSort";

const TYPE_BIT = "\u0000";

describe("importSort", () => {
    describe("non types", () => {
        it("should match react only", () => {
            expect(new RegExp(REGEX_REACT_LIBS_NOT_TYPES, "u").test("react")).toBe(true);
            expect(new RegExp(REGEX_REACT_LIBS_NOT_TYPES, "u").test("non-react")).toBe(false);
            expect(new RegExp(REGEX_REACT_LIBS_NOT_TYPES, "u").test("reacta")).toBe(false);

            expect(new RegExp(REGEX_REACT_LIBS_NOT_TYPES, "u").test("react-dom")).toBe(true);
            expect(new RegExp(REGEX_REACT_LIBS_NOT_TYPES, "u").test("react-dom/server")).toBe(true);
            expect(new RegExp(REGEX_REACT_LIBS_NOT_TYPES, "u").test("react/jsx-runtime")).toBe(true);
        });

        it("should match react without a type", () => {
            expect(new RegExp(REGEX_REACT_LIBS_NOT_TYPES, "u").test("react" + TYPE_BIT)).toBe(false);
            expect(new RegExp(REGEX_REACT_LIBS_NOT_TYPES, "u").test("non-react" + TYPE_BIT)).toBe(false);
            expect(new RegExp(REGEX_REACT_LIBS_NOT_TYPES, "u").test("react6" + TYPE_BIT)).toBe(false);

            expect(new RegExp(REGEX_REACT_LIBS_NOT_TYPES, "u").test("react-dom" + TYPE_BIT)).toBe(false);
            expect(new RegExp(REGEX_REACT_LIBS_NOT_TYPES, "u").test("react-dom/server" + TYPE_BIT)).toBe(false);
            expect(new RegExp(REGEX_REACT_LIBS_NOT_TYPES, "u").test("react/jsx-runtime" + TYPE_BIT)).toBe(false);
        });
    });

    describe("with any types", () => {
        it("should match react only", () => {
            expect(new RegExp(REGEX_REACT_LIBS, "u").test("react")).toBe(true);
            expect(new RegExp(REGEX_REACT_LIBS, "u").test("non-react")).toBe(false);
            expect(new RegExp(REGEX_REACT_LIBS, "u").test("react6")).toBe(false);

            expect(new RegExp(REGEX_REACT_LIBS, "u").test("react-dom")).toBe(true);
            expect(new RegExp(REGEX_REACT_LIBS, "u").test("react-dom/server")).toBe(true);
            expect(new RegExp(REGEX_REACT_LIBS, "u").test("react/jsx-runtime")).toBe(true);
        });

        it("should match react with a type", () => {
            expect(new RegExp(REGEX_REACT_LIBS, "u").test("react" + TYPE_BIT)).toBe(true);
            expect(new RegExp(REGEX_REACT_LIBS, "u").test("non-react" + TYPE_BIT)).toBe(false);
            expect(new RegExp(REGEX_REACT_LIBS, "u").test("react6" + TYPE_BIT)).toBe(false);

            expect(new RegExp(REGEX_REACT_LIBS, "u").test("react-dom" + TYPE_BIT)).toBe(true);
            expect(new RegExp(REGEX_REACT_LIBS, "u").test("react-dom/server" + TYPE_BIT)).toBe(true);
            expect(new RegExp(REGEX_REACT_LIBS, "u").test("react/jsx-runtime" + TYPE_BIT)).toBe(true);
        });
    });
});
