import { readFile } from "fs/promises";

const detectReact = async () => {
    const packageJson = JSON.parse(String(await readFile("./package.json"))) as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
    };
    return Boolean((packageJson.dependencies?.react) || (packageJson.devDependencies?.react));
};

export {
    detectReact,
};
