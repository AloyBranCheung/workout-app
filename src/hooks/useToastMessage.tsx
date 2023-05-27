import { toast, ToastOptions } from "react-toastify";

export enum ToastMessage {
  Success = "success",
  Error = "error",
}

const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export default function useToastMessage() {
  const toastMessage = (message: string, type: ToastMessage) => {
    switch (type) {
      case ToastMessage.Success:
        toast.success(message, toastConfig);
        break;
      case ToastMessage.Error:
        toast.error(message, toastConfig);
        break;
      default:
    }
  };

  return toastMessage;
}
