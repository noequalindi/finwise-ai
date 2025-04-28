import { useState, useEffect } from "react";
import QuestionForm from "./components/QuestionForm";  // Asegúrate de importar el componente
import ChatDisplay from "./components/ChatDisplay";
import TokenSummary from "./components/TokenSummary";
import Modal from "./components/Modal";
import { Typewriter } from "react-simple-typewriter";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [tokenInfo, setTokenInfo] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("finwise_user_name");
    const storedMessages = localStorage.getItem("finwise_messages");

    if (storedName) setUserName(storedName);
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages);
      setMessages(parsedMessages);
    }
  }, []);

  const handleNewResponse = (data, userQuestion, imageUploaded) => {
    const newMessages = [];
  
    newMessages.push({ role: "User", content: userQuestion });
  
    if (imageUploaded) {
      newMessages.push({ role: "VisionArg", content: data.vision_analysis });
    }
  
    if (data.response && data.response.includes("https://")) {
      newMessages.push({
        role: "VisionArg", 
        content: data.response 
      });
    } 

    if(data.response && !data.response.includes("https://")) {
      newMessages.push({ role: "TextArg", content: data.response });
    }
    setMessages((prev) => {
      const updatedMessages = [...prev, ...newMessages];
      localStorage.setItem("finwise_messages", JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  
    setTokenInfo({
      tokens_input: data.tokens_input,
      tokens_reasoning: data.tokens_reasoning,
      tokens_output: data.tokens_output,
    });
  };
  

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (nameInput.trim() !== "") {
      const name = nameInput.trim();
      setUserName(name);
      localStorage.setItem("finwise_user_name", name);
    }
  };

  const clearChatHistory = () => {
    setMessages([]);
    localStorage.removeItem("finwise_messages");
    setTokenInfo(null);
  };

  const handleClearChatClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmClear = () => {
    clearChatHistory();
    setShowConfirmModal(false);
  };

  const handleCancelClear = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8 text-center">
        <Typewriter
          words={["FinWise AI 🚀 📈"]}
          loop={1}
          cursor
          typeSpeed={90}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>

      {!userName ? (
        <div className="userName-container">
        <form onSubmit={handleNameSubmit} className="flex flex-col space-y-4 bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <label className="text-lg font-semibold text-gray-700 text-center">¿Cómo te llamás? ✨</label>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Ingresá tu nombre"
            className="chat-textarea-name"
            required
          />
          <button
            type="submit"
            className="button-primary"
          >
            ¡Empezar!
          </button>
        </form>
        </div>
      ) : (
        <div className="w-full max-w-5xl flex flex-col items-center space-y-10 animate-fade-slide-up">
          <div className="text-center text-xl font-semibold text-gray-800 animate-fade-in-down">
            ¡Hola {userName}! ✨ ¿Listos para analizar finanzas?
          </div>

          {messages.length > 0 && (
            <div className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md">
              <button
                className="button-primary"
                onClick={handleClearChatClick}
              >
                Borrar Chat  🧹
              </button>
            </div>
          )}

          <div className="w-full flex flex-col items-center">
            <ChatDisplay messages={messages} userName={userName} />
          </div>

          <QuestionForm onResponse={handleNewResponse} userName={userName} />

          {tokenInfo && (
            <TokenSummary tokenInfo={tokenInfo} />
          )}
        </div>
      )}

      <Modal
        isOpen={showConfirmModal}
        onConfirm={handleConfirmClear}
        onCancel={handleCancelClear}
      />
    </div>
  );
}
