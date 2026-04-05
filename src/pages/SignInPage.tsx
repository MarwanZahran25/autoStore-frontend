import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import logo from "../assets/logo.webp";
import { Field, FieldError, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAuthStore } from "../store";

export default function SignInPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);
    try {
      const response = await api.post(
        `${import.meta.env.VITE_BACKEND_SERVER}/auth/login`,
        {
          password,
        },
      );
      const { token } = response.data;
      setToken(token);
      toast.success("Signed in successfully");
      navigate("/");
    } catch {
      toast.error("Sign in failed. Please check your password.");
    } finally {
      console.log(import.meta.env.VITE_BACKEND_SERVER)
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Field data-invalid={error}>
            <FieldLabel>Password</FieldLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error && e.target.value.trim()) {
                  setError(false);
                }
              }}
              onBlur={() => setError(!password.trim())}
              aria-invalid={error}
              disabled={loading}
            />
            <FieldError
              errors={error ? [{ message: "Password is required" }] : []}
            />
          </Field>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="text-center text-sm text-red-400">
            To see a demo use the password "DEMO"
          </p>
        </form>
      </div>
    </div>
  );
}
