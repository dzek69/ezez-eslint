const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

module.exports = {
    // testMatch: [],
    collectCoverageFrom: [
        "src/**/*.{mjs,js,jsx,ts,tsx}",
        "!**/*.d.ts",
    ],
    setupFiles: [
        "<rootDir>/test/bootstrap.cjs",
    ],
    testEnvironment: "node",
    testEnvironmentOptions: {
        url: "http://localhost:8080",
    },
    moduleNameMapper: {
        "^(.*)\\.js$": "$1",
    },
    transform: {
        ...tsJestTransformCfg,
    },
};
