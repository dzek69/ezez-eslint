#!/usr/bin/env node
import { execa } from "execa";

console.info("eslint running with @ezez/eslint wrapper");

const args = process.argv.slice(2);

await execa("eslint", args, {
    preferLocal: true,
    stdio: "inherit", // Directly inherit stdio to show output in the terminal
}).catch((error) => {
    process.exit(error?.exitCode ?? 1);
});
