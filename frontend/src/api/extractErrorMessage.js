export function extractErrorMessage (errorData) {
    if (Array.isArray(errorData.detail)) {
        return errorData.detail.map(error => error.input).join(" | ")
    } else if (typeof errorData.detail === "string") {
        return errorData.detail
    } else {
        return "Unknow error"
    }
};