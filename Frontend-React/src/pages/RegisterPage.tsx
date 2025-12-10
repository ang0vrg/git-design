// src/components/Register/Register.tsx
import type { ChangeEvent, FormEvent, FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import MessagePopup from "../components/Common/MessagePopup";
import { countries } from '../data/phoneCountries';

export interface RegisterFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // +51 987 654 321 (visual)
  password: string;
  confirmPassword: string;
}

const RegisterPage: FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "firstName" || name === "lastName") {
      const lettersOnly = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
      if (!lettersOnly.test(value)) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // 1. Validación visual (con espacios)
    const country = countries.find((c) => formData.phone.startsWith(c.prefix));
    if (!country || !country.pattern.test(formData.phone)) {
      setMessage("Número incompleto / inválido para el país seleccionado");
      setIsError(true);
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Las contraseñas NO coinciden");
      setIsError(true);
      setLoading(false);
      return;
    }

    try {
      // 2. Sin espacios para el backend
      const phoneDigits = formData.phone.replace(/[^0-9]/g, "");
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: "+" + phoneDigits, // ← sin espacios, con +
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      console.log("Payload:", JSON.stringify(payload, null, 2));

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        navigate("/login");
      } else {
        setMessage(data.msg || "No se pudo crear la cuenta");
        setIsError(true);
      }
    } catch {
      setMessage("Error de red. Verifica que Quarkus esté activo");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const switchToLogin = () => navigate("/login");

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6 bg-black"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      </div>

      <div className="relative w-full max-w-2xl bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white border border-purple-500/30">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Crear Cuenta
          </h1>
          <p className="mt-2 text-sm text-gray-300">
            Regístrate para gestionar tu consumo energético
          </p>
        </div>

        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          switchToLogin={switchToLogin}
          loading={loading}
        />

        <MessagePopup message={message} isError={isError} />
      </div>
    </main>
  );
};

export default RegisterPage;