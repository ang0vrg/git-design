import { useState } from "react";
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  SparklesIcon 
} from "@heroicons/react/24/solid";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente de IA para EnergyIQ. ¿En qué puedo ayudarte hoy?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response (aquí puedes integrar una API real)
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputMessage),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("consumo") || input.includes("energía")) {
      return "Puedo ayudarte con información sobre el consumo de energía. Puedes ver estadísticas detalladas en el Dashboard o en la sección de Reportes. ¿Necesitas ayuda con algo específico?";
    } else if (input.includes("edificio") || input.includes("building")) {
      return "Para gestionar edificios, dirígete a la sección 'Edificios' donde puedes agregar, editar o eliminar edificios y sus medidores.";
    } else if (input.includes("alerta") || input.includes("alert")) {
      return "Las alertas te notifican sobre consumos anormales. Puedes configurar umbrales personalizados en la sección de Configuración.";
    } else if (input.includes("reporte") || input.includes("report")) {
      return "En la sección de Reportes puedes generar informes detallados de consumo por período, edificio o medidor.";
    } else if (input.includes("ayuda") || input.includes("help")) {
      return "Estoy aquí para ayudarte con:\n• Consultas sobre consumo de energía\n• Gestión de edificios y medidores\n• Configuración de alertas\n• Generación de reportes\n¿Qué necesitas?";
    } else {
      return "Entiendo tu consulta. ¿Podrías darme más detalles para poder ayudarte mejor? Puedo asistirte con consumo de energía, edificios, alertas y reportes.";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-gray-900 border border-purple-500/30 rounded-2xl shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Asistente IA</h3>
                <p className="text-white/80 text-xs">Siempre disponible</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded-lg transition"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-100 border border-white/10"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-purple-200"
                        : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 border border-white/10 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-gray-900/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 group"
      >
        {isOpen ? (
          <XMarkIcon className="w-7 h-7 text-white" />
        ) : (
          <>
            <ChatBubbleLeftRightIcon className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></span>
          </>
        )}
      </button>

      {/* Tooltip */}
      {!isOpen && (
        <div className="fixed bottom-6 right-24 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40 border border-purple-500/30">
          ¿Necesitas ayuda? Pregúntame
        </div>
      )}
    </>
  );
}
