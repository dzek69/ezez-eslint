import {getEslintConfig} from "./esm/index.js";

export default getEslintConfig({ react: true }).concat([
    {
        files: ["src/rules/*.ts"],
        rules: {
            "max-lines-per-function": "off",
            "new-cap": "off",
            "max-lines": "off",
        }
    }
]);
