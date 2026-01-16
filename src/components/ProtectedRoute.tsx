import { Navigate, Outlet } from "react-router";
import { api } from "../lib/api";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../store";
import { useQuery } from "@tanstack/react-query";
import { backendServer } from "@/myConfig";

export default function ProtectedRoute() {
  const { token, clearToken } = useAuthStore();
  const { data, isPending, error } = useQuery({
    queryFn: async () => {
      try {
        const res = await api.post(`${backendServer}/auth/verify`);
        return res.data;
      } catch (e) {
        clearToken();
        throw e;
      }
    },
    queryKey: [`validity`, token],
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
  if (error || !token) {
    return <Navigate to="/login" replace />;
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (data) {
    return <Outlet />;
  }
}
