import { toast } from "react-toastify";

const notificationStyles = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export function toastNotify(message) {
  toast(message, notificationStyles);
}
