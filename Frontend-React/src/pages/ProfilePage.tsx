import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserCircleIcon, EnvelopeIcon, PhoneIcon, CalendarIcon } from "@heroicons/react/24/solid";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
  phone: string;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      console.log("Fetching profile with token:", token.substring(0, 20) + "...");

      const response = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Profile data:", data);
        setProfile(data);
        setError(null);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", errorData);
        
        if (response.status === 401) {
          setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
          setTimeout(() => navigate("/login"), 2000);
        } else if (response.status === 404) {
          setError("Perfil no encontrado.");
        } else {
          setError(errorData.msg || `Error al cargar el perfil (${response.status})`);
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Error de conexión. Verifica que el servidor esté activo en http://localhost:8080");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleName = (role: string) => {
    const roles: { [key: string]: string } = {
      CLIENT: "Cliente",
      ADMIN: "Administrador",
      OPERATOR: "Operador",
    };
    return roles[role] || role;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl">
          <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Mi Perfil
          </h1>

          {error && (
            <div className="p-6 rounded-lg mb-6 bg-red-500/20 text-red-300 border border-red-500/30">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="font-semibold mb-1">Error al cargar el perfil</p>
                  <p className="text-sm">{error}</p>
                  <button
                    onClick={() => {
                      setError(null);
                      setLoading(true);
                      fetchProfile();
                    }}
                    className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm font-medium"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            </div>
          )}

          {profile && (
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-8 border-b border-white/10">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-lg flex-shrink-0">
                  {profile.profileImageUrl ? (
                    <img 
                      src={`http://localhost:8080${profile.profileImageUrl}`} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="w-full h-full text-gray-600" />
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white mb-2">{profile.username}</h2>
                  <p className="text-purple-400 font-medium mb-1">{getRoleName(profile.role)}</p>
                  <p className="text-gray-400 text-sm">ID: {profile.id}</p>
                </div>
              </div>

              {/* Profile Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="bg-black/30 rounded-lg p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <EnvelopeIcon className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-medium text-gray-400">Correo Electrónico</h3>
                  </div>
                  <p className="text-white text-lg">{profile.email}</p>
                </div>

                {/* Phone */}
                <div className="bg-black/30 rounded-lg p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <PhoneIcon className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-medium text-gray-400">Teléfono</h3>
                  </div>
                  <p className="text-white text-lg">{profile.phone || "No especificado"}</p>
                </div>

                {/* Created At */}
                <div className="bg-black/30 rounded-lg p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <CalendarIcon className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-medium text-gray-400">Fecha de Registro</h3>
                  </div>
                  <p className="text-white text-lg">{formatDate(profile.createdAt)}</p>
                </div>

                {/* Updated At */}
                <div className="bg-black/30 rounded-lg p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <CalendarIcon className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-medium text-gray-400">Última Actualización</h3>
                  </div>
                  <p className="text-white text-lg">{formatDate(profile.updatedAt)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}