import { Link } from "react-router-dom";
import {
  BoltIcon,
  ChartBarIcon,
  BellAlertIcon,
  ShieldCheckIcon,
  SparklesIcon,
  DocumentChartBarIcon,
  GlobeAltIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

export default function LandingPage() {
  const objectives = [
    {
      icon: ChartBarIcon,
      title: "Visualización en Tiempo Real",
      description:
        "Diseñar una plataforma digital que permita la visualización en tiempo real del consumo energético de los edificios.",
    },
    {
      icon: BellAlertIcon,
      title: "Sistema de Alertas Automáticas",
      description:
        "Implementar un sistema de alertas automáticas para detectar consumos excesivos y anomalías en el uso de energía.",
    },
    {
      icon: SparklesIcon,
      title: "Análisis Predictivo con IA",
      description:
        "Incorporar herramientas de análisis predictivo basadas en inteligencia artificial para anticipar patrones de consumo energético.",
    },
    {
      icon: DocumentChartBarIcon,
      title: "Reportes Automatizados",
      description:
        "Generar reportes automatizados que faciliten la toma de decisiones estratégicas en la gestión energética.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Seguridad y Accesibilidad",
      description:
        "Garantizar la seguridad y accesibilidad del sistema mediante control de accesos por roles e interfaces adaptativas para distintos dispositivos.",
    },
  ];

  const stats = [
    { value: "30%", label: "Consumo energético mundial en edificios" },
    { value: "27%", label: "Emisiones globales de CO₂" },
    { value: "100%", label: "Monitoreo en tiempo real" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <BoltIcon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                EnergyIQ
              </h1>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Sistema de Gestión Energética
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Inteligente y Sostenible
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Optimiza el consumo eléctrico en edificios mediante monitoreo en tiempo real,
              análisis predictivo con IA y reportes automatizados. Reduce costos operativos
              y emisiones de CO₂.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/login"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg shadow-purple-900/50 flex items-center justify-center gap-2 group"
              >
                Iniciar Sesión
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                to="/register"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg transition border border-white/20"
              >
                Registrarse
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                >
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <GlobeAltIcon className="w-8 h-8 text-purple-400" />
              <h3 className="text-3xl font-bold">Introducción</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              La creciente preocupación por el cambio climático y el incremento de los costos
              de la energía han impulsado la necesidad de implementar soluciones innovadoras
              que optimicen el uso de los recursos energéticos. En este contexto, los sistemas
              de gestión energética en edificios surgen como herramientas fundamentales para
              promover la eficiencia y reducir las emisiones de gases de efecto invernadero,
              contribuyendo así a los objetivos globales de sostenibilidad.
            </p>
          </div>
        </div>
      </section>

      {/* ODS Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-center">
              Objetivos de Desarrollo Sostenible (ODS)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-600/30 rounded-xl p-6">
                <div className="text-6xl mb-4">⚡</div>
                <h4 className="text-xl font-bold mb-3 text-yellow-400">
                  ODS 7: Energía Asequible y No Contaminante
                </h4>
                <p className="text-gray-300">
                  Garantizar el acceso a una energía segura, sostenible y moderna para todos.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-600/30 rounded-xl p-6">
                <div className="text-6xl mb-4">🌍</div>
                <h4 className="text-xl font-bold mb-3 text-green-400">
                  ODS 13: Acción por el Clima
                </h4>
                <p className="text-gray-300">
                  Reducir las emisiones de gases de efecto invernadero mediante medidas de
                  eficiencia energética.
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-6 text-center italic">
              Fuente: Naciones Unidas, 2015
            </p>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Problem */}
              <div className="bg-red-900/10 border border-red-500/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-red-400">❌ Problema</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  El consumo energético en edificios constituye uno de los principales desafíos
                  a nivel global. De acuerdo con la Agencia Internacional de Energía (2022),
                  los edificios representan alrededor del <strong>30% del consumo final de
                  energía mundial</strong> y el <strong>27% de las emisiones globales de
                  CO₂</strong> relacionadas con la energía.
                </p>
                <p className="text-gray-400 text-sm">
                  En el caso peruano, el Ministerio del Ambiente (2021) ha identificado que
                  muchas instituciones presentan un uso ineficiente de la electricidad, lo que
                  incrementa tanto los costos económicos como los impactos ambientales.
                </p>
              </div>

              {/* Solution */}
              <div className="bg-green-900/10 border border-green-500/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-green-400">✅ Solución</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  El proyecto propone la creación de una plataforma de gestión energética que
                  permita supervisar el consumo eléctrico en tiempo real, generar alertas
                  automáticas y emitir reportes analíticos que faciliten la toma de decisiones
                  estratégicas.
                </p>
                <p className="text-gray-400 text-sm">
                  A través de herramientas como Python, Grafana y algoritmos de inteligencia
                  artificial, es posible anticipar picos de consumo y establecer patrones de
                  uso eficiente, contribuyendo a disminuir las emisiones de gases de efecto
                  invernadero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Objective */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">🎯 Objetivo General</h3>
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-8">
              <p className="text-xl text-gray-200 leading-relaxed">
                Desarrollar un sistema de gestión energética que optimice el consumo eléctrico
                en edificios mediante el monitoreo en tiempo real, generación de reportes
                analíticos y control de accesos, con el fin de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-semibold">
                  reducir costos operativos y emisiones de CO₂
                </span>
                , contribuyendo a la sostenibilidad institucional y ambiental.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specific Objectives */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold mb-12 text-center">
              Objetivos Específicos
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {objectives.map((objective, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <objective.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-purple-300">
                    {objective.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {objective.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">
            ¿Listo para optimizar tu consumo energético?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a la revolución de la gestión energética inteligente y contribuye a un
            futuro más sostenible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg shadow-purple-900/50"
            >
              Comenzar Ahora
            </Link>
            <Link
              to="/login"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg transition border border-white/20"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p className="mb-2">
            © 2025 EnergyIQ - Sistema de Gestión Energética Inteligente
          </p>
          <p className="text-sm">
            Contribuyendo a los Objetivos de Desarrollo Sostenible | ODS 7 & ODS 13
          </p>
        </div>
      </footer>
    </div>
  );
}
