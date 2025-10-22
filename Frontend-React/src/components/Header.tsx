import { useState } from "react";
import { Building2, Globe, Users, Menu, Sun, Moon } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useDarkMode();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/90 backdrop-blur border-b transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo y título */}
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />
          <h1 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            Sistema de Gestión Energética
          </h1>
        </div>

        {/* Menú Desktop */}
        <nav className="hidden md:flex items-center gap-4">
          <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
            <Globe className="w-4 h-4" /> Multisedes
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
            <Users className="w-4 h-4" /> Multiusuario
          </span>

          {/* Botón de modo oscuro */}
          <button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Cambiar tema"
            title="Cambiar tema"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Botón login */}
          <button className="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition">
            Iniciar sesión
          </button>
        </nav>

        {/* Botón menú móvil */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t p-4 space-y-2 transition-colors">
          <span className="block text-gray-700 dark:text-gray-300">
            🌐 Multisedes
          </span>
          <span className="block text-gray-700 dark:text-gray-300">
            👥 Multiusuario
          </span>
          <button
            onClick={toggle}
            className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {theme === "dark" ? "Modo claro ☀️" : "Modo oscuro 🌙"}
          </button>
          <button className="w-full bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition">
            Iniciar sesión
          </button>
        </div>
      )}
    </header>
  );
}
