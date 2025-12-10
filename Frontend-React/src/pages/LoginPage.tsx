import type { ChangeEvent, FormEvent, FC } from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import LoginForm from "../components/LoginForm";
import MessagePopup from "../components/Common/MessagePopup";

interface LoginFormState {
  email: string;
  password: string;
}

const Login: FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password.trim(),
        }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        navigate("/dashboard"); // redirige al Dashboard
      } else {
        setMessage(data.msg || "Credenciales inválidas");
        setIsError(true);
      }
    } catch {
      setMessage("Error de red");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const switchToRegister = () => navigate("/register");
  const switchToForgotPassword = () => navigate("/forgot-password");

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6 bg-black"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      </div>

      {/* Glass card */}
      <div className="relative w-full max-w-md bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white border border-purple-500/30">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Bienvenido de nuevo
          </h1>
          <p className="mt-2 text-sm text-gray-300">
            Accede al Sistema de Gestión Energética
          </p>
        </div>

        <LoginForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          switchToRegister={switchToRegister}
          switchToForgotPassword={switchToForgotPassword}
          loading={loading}
        />

        <MessagePopup message={message} isError={isError} />
      </div>
    </main>
  );
};

export default Login;
