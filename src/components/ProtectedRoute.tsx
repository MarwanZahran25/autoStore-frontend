import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { api } from "../lib/api";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../store";

export default function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);
  const clearToken = useAuthStore((state) => state.clearToken);
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        await api.get("/auth/verify");
        setIsValid(true);
      } catch {
        clearToken();
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token, clearToken]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isValid || !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
