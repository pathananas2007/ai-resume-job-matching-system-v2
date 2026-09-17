import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import { ToastProvider } from "./components/ui/Toast";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const initFirebaseAuth = useAuthStore((state) => state.initFirebaseAuth);

  useEffect(() => {
    initFirebaseAuth();
  }, [initFirebaseAuth]);

  return (
    <ToastProvider>
      {" "}
      <RouterProvider router={router} />{" "}
    </ToastProvider>
  );
}
