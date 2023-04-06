import { toast } from "react-toastify";

export function showSuccess(text) {
    return toast.success(text)
}

export function showError(text) {
    return toast.error(text)
}