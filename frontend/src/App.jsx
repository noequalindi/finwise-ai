import { useState } from "react";
import QuestionForm from "./components/QuestionForm";
import ChatDisplay from "./components/ChatDisplay";

export default function App() {
  const [messages, setMessages] = useState([]);

  const handleNewResponse = (data, userQuestion, imageUploaded) => {
    const newMessages = [];

    newMessages.push({
      role: "User",
      content: userQuestion,
    });

    if (imageUploaded) {
      newMessages.push({
        role: "VisionArg",
        content: data.vision_analysis,
      });
    }

    newMessages.push({
      role: "TextArg",
      content: data.response,
    });

    setMessages((prev) => [...prev, ...newMessages]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Asistente Financiero IA 🚀</h1>
      
      <QuestionForm onResponse={handleNewResponse} />
      
      <ChatDisplay messages={messages} />
    </div>
  );
}
