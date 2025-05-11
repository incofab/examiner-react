import toast from "react-hot-toast";

interface ToastParams {
  ok: boolean;
  message: string | null;
  data?: any;
}

export default function useMyToast() {
  function handleResponseToast(res: ToastParams): boolean {
    if (!res || !res.ok) {
      toast.error(res.message ?? "Error process request");
    } else {
      toast.success(res.data?.message ?? "operation successful");
    }
    return res?.ok;
  }

  function toastError(message?: string) {
    return void toast.error(message ?? "Error process request");
  }

  function toastSuccess(message: string) {
    return void toast.success(message);
  }

  return { handleResponseToast, toastSuccess, toastError };
}
