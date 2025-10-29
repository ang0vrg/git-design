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
        navigate("/"); // redirige al Dashboard
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
      className="min-h-screen flex items-center justify-center p-6 bg-fixed bg-cover bg-center"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)",
      }}
    >
      {/* Glass card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-white border border-white/20">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold drop-shadow-md">
            Bienvenido de nuevo
          </h1>
          <p className="mt-2 text-sm text-white/80">
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
