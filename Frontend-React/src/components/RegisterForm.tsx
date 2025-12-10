import type { ChangeEvent, FormEvent, FC } from "react";
import FormInput from "./Common/FormInput";
import { PhoneInput } from "./Common/PhoneInput";

export interface RegisterFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // +51 987 654 321 (visual)
  password: string;
  confirmPassword: string;
}

type ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;
type SubmitHandler = (e: FormEvent<HTMLFormElement>) => void;
type LoginSwitchHandler = () => void;

interface RegisterFormProps {
  formData: RegisterFormState;
  handleChange: ChangeHandler;
  handleSubmit: SubmitHandler;
  switchToLogin: LoginSwitchHandler;
  loading: boolean;
}

const RegisterForm: FC<RegisterFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  switchToLogin,
  loading,
}) => {
  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        {/* Nombre */}
        <FormInput
          label={
            <span>
              Nombre <em className="text-red-500">*</em>
            </span>
          }
          id="firstName"
          type="text"
          name="firstName"
          placeholder="Tu nombre"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        {/* Apellido */}
        <FormInput
          label={
            <span>
              Apellido <em className="text-red-500">*</em>
            </span>
          }
          id="lastName"
          type="text"
          name="lastName"
          placeholder="Tu apellido"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        {/* Correo */}
        <FormInput
          label={
            <span>
              Correo Electrónico <em className="text-red-500">*</em>
            </span>
          }
          id="email"
          type="email"
          name="email"
          placeholder="correo@correo.com"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* ❗ Teléfono con selector de país (visual con espacios) */}
        <PhoneInput
          value={formData.phone}
          onChange={(raw) =>
            handleChange({
              target: { name: "phone", value: raw },
            } as ChangeEvent<HTMLInputElement>)
          }
          required
        />

        {/* Contraseña */}
        <FormInput
          label={
            <span>
              Contraseña <em className="text-red-500">*</em>
            </span>
          }
          id="password"
          type="password"
          name="password"
          placeholder="••••••••••••••••"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Confirmar contraseña */}
        <FormInput
          label={
            <span>
              Confirmar Contraseña <em className="text-red-500">*</em>
            </span>
          }
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="••••••••••••••••"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {/* Botón enviar */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center py-3 rounded-lg font-semibold text-white transition shadow-lg
            ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-purple-900/50"
            }`}
        >
          {loading ? (
            <>
              <svg
                className="mr-3 h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Registrando…
            </>
          ) : (
            "Registrarse"
          )}
        </button>

        {/* Enlace a login */}
        <p className="text-center text-sm text-gray-300">
          ¿Ya tienes cuenta?{" "}
          <button
            type="button"
            onClick={switchToLogin}
            className="text-purple-400 hover:underline hover:text-purple-300 font-semibold"
          >
            Inicia sesión aquí
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
