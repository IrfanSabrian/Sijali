import { ref } from "vue";

const toasts = ref([]);
let toastId = 0;

export const useToast = () => {
  const show = ({ message, type = "info", duration = 3000 }) => {
    const id = toastId++;
    const toast = { id, message, type, visible: true };
    toasts.value.push(toast);

    if (duration > 0) {
      setTimeout(() => {
        remove(id);
      }, duration);
    }

    return id;
  };

  const remove = (id) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.value[index].visible = false;
      setTimeout(() => {
        toasts.value.splice(index, 1);
      }, 300);
    }
  };

  const success = (message, duration) =>
    show({ message, type: "success", duration });
  const error = (message, duration) =>
    show({ message, type: "error", duration });
  const warning = (message, duration) =>
    show({ message, type: "warning", duration });
  const info = (message, duration) => show({ message, type: "info", duration });

  return {
    toasts,
    show,
    remove,
    success,
    error,
    warning,
    info,
  };
};
