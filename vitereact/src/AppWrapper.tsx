import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { useAppStore } from "./store/main";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const AppWrapper: React.FC = () => {
  const isDarkMode = useAppStore((state) => state.user_setting.dark_mode_enabled);
  const setInitialAuth = useAppStore((state) => state.set_auth);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem("authToken");
    if (token) {
      setInitialAuth({
        token,
        is_authenticated: true,
        user_id: localStorage.getItem("userId") || "",
      });
    }

    // Apply dark mode class
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode, setInitialAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={isDarkMode ? "dark" : ""}>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: isDarkMode ? "#374151" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
};

export default AppWrapper;