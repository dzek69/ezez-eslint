import type { MergedOptions } from "../types";

import { ensureExtensions } from "../defaults";

const DEFAULT_REACT_EXTENSIONS = ["jsx", "tsx"];

const getFilesPropertyForReact = (mergedOptions: MergedOptions): { files?: string[] } => {
    const paths = Array.isArray(mergedOptions.react)
        ? mergedOptions.react
        : (
            mergedOptions.react && typeof mergedOptions.react === "object"
                ? mergedOptions.react.files?.paths
                : undefined
        );

    if (!paths) {
        return {};
    }

    const addExtensions: string[] | boolean = Array.isArray(mergedOptions.react)
        ? true
        : (
            mergedOptions.react && typeof mergedOptions.react === "object"
                ? (mergedOptions.react.files?.addExtensions) ?? true
                : true
        );

    if (!addExtensions) {
        return {
            files: paths,
        };
    }

    return {
        files: paths.map(p => ensureExtensions(
            p, addExtensions === true ? DEFAULT_REACT_EXTENSIONS : addExtensions,
        )).flat(),
    };
};

export {
    getFilesPropertyForReact,
};
