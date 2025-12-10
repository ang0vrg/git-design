// Frontend-React\src\components\Header.tsx
import { useState, useEffect } from "react";
import {
  BellIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

type JWTPayload = {
  email?: string;
  name?: string; // nombre completo
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState<JWTPayload | null>(null);
  const nav = useNavigate();

  const parseJwt = (token: string): JWTPayload | null => {
    try {
      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));
      return payload;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(parseJwt(token));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    nav("/login");
  };

  const navLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Edificios", href: "/buildings" },
    { label: "Reportes", href: "/reports" },
    { label: "Alertas", href: "/alerts" },
  ];

  // Icono SVG de perfil
  const ProfileIcon = ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => nav("/dashboard")}
          >
            <img src="/icon.svg" alt="Logo" className="h-8 w-auto" />
            <span className="text-white font-semibold text-lg">EnergyIQ</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => nav(l.href)}
                className="text-gray-300 hover:text-white transition"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white">
              <BellIcon className="h-6 w-6" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Cog6ToothIcon className="h-6 w-6" />
            </button>

            {/* Logged-in user */}
            {user && (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-gray-300 text-sm">
                  {user.name || user.email}
                </span>
                <div className="relative">
                  <button
                    onClick={() => setShowMenu((v) => !v)}
                    className="flex items-center space-x-1 text-gray-400 hover:text-white"
                  >
                    <ProfileIcon className="h-7 w-7" />
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 text-gray-300 text-sm border-b border-white/10">
                        {user.email}
                      </div>
                      <button
                        onClick={() => {
                          nav("/profile");
                          setShowMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white"
                      >
                        Editar perfil
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Not logged-in */}
            {!user && (
              <div className="hidden md:flex space-x-2">
                <button
                  onClick={() => nav("/login")}
                  className="text-gray-300 hover:text-white transition"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => nav("/register")}
                  className="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition"
                >
                  Registrarse
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden bg-black/40 backdrop-blur-md rounded-b-lg pb-4">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => {
                  nav(l.href);
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white"
              >
                {l.label}
              </button>
            ))}

            <div className="border-t border-white/10 mt-2 pt-2">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 px-4 py-2 text-gray-300 text-sm">
                    <ProfileIcon className="w-5 h-5" />
                    <span>{user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      nav("/profile");
                      setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Editar perfil
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      nav("/login");
                      setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Iniciar sesión
                  </button>
                  <button
                    onClick={() => {
                      nav("/register");
                      setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-green-400 hover:text-green-300"
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
