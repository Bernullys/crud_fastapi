export function extractErrorMessage (errorData) {
    if (Array.isArray(errorData.detail)) {
        return errorData.detail.map(error => error.msg).join(" | ")
    } else if (typeof errorData.detail === "string") {
        return errorData.detail
    } else {
        return "Unknow error"
    }
};