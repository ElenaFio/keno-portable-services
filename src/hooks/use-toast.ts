import * as React from "react";

export type ToastProps = {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
};

type ToastState = {
  toasts: ToastProps[];
};

let memoryState: ToastState = { toasts: [] };
const listeners: Array<(state: ToastState) => void> = [];

function dispatch(action: { type: string; toast?: ToastProps; id?: string }) {
  if (action.type === "ADD_TOAST" && action.toast) {
    const id = action.toast.id || Math.random().toString(36).substring(2, 9);
    memoryState = {
      toasts: [...memoryState.toasts, { ...action.toast, id }].slice(-3),
    };
    setTimeout(() => {
      dispatch({ type: "DISMISS_TOAST", id });
    }, 4000);
  } else if (action.type === "DISMISS_TOAST") {
    memoryState = {
      toasts: memoryState.toasts.filter((t) => t.id !== action.id),
    };
  }
  listeners.forEach((listener) => listener(memoryState));
}

export function toast(props: ToastProps) {
  dispatch({ type: "ADD_TOAST", toast: props });
}

export function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const idx = listeners.indexOf(setState);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  return {
    toasts: state.toasts,
    toast,
    dismiss: (id: string) => dispatch({ type: "DISMISS_TOAST", id }),
  };
}
