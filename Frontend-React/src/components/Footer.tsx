import { Linkedin, Github, Mail } from "lucide-react";
// bun add framer-motion
// import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-8 mt-auto border-t border-gray-800 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sección izquierda */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">
            Sistema de Gestión Energética
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Plataforma integral para la supervisión, análisis y optimización del
            consumo eléctrico institucional. Comprometidos con la eficiencia y
            la sostenibilidad ambiental.
          </p>
        </div>

        {/* Sección central */}
        <div className="flex flex-col items-start md:items-center">
          <h3 className="text-sm font-semibold text-white mb-2 uppercase tracking-wide">
            Enlaces Rápidos
          </h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-green-400 transition-colors">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition-colors">
                Reportes Energéticos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition-colors">
                Configuración
              </a>
            </li>
          </ul>
        </div>

        {/* Sección derecha */}
        <div className="text-sm md:text-right">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Gestión Energética Institucional.
          </p>
          <p className="text-gray-500">
            Eficiencia, Innovación y Sostenibilidad.
          </p>

          {/* Redes sociales */}
          <div className="flex md:justify-end justify-start space-x-4 mt-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:contacto@energia.pe"
              className="hover:text-green-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500 dark:text-gray-500">
        Desarrollado con <span className="text-green-400">Quarkus</span> ·{" "}
        <span className="text-blue-400">React</span> ·{" "}
        <span className="text-teal-400">TailwindCSS</span>
      </div>
    </footer>
  );
}
