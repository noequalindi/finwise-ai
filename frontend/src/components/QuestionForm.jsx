import { useState, useEffect } from "react";
import { sendQuestion } from "../api/api";
import { FiUploadCloud, FiSend } from "react-icons/fi";
import Loader from "./Loader";
import "../styles/chat.css";

export default function QuestionForm({ onResponse, userName }) {
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]); 

  useEffect(() => {
    const storedPreview = localStorage.getItem("imagePreview");
    if (storedPreview) {
      setImagePreview(storedPreview);
    }

    window.addEventListener("beforeunload", clearTempImage);
    return () => window.removeEventListener("beforeunload", clearTempImage);
  }, []);

  const clearTempImage = () => {
    localStorage.removeItem("imagePreview");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      localStorage.setItem("imagePreview", previewUrl);  
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim() && !image) return; 

    setLoading(true);

    let prompt = `Nombre del usuario: ${userName}\n`;
    
    if (image && !question.trim()) {
      prompt += "User: Image attached";
    } else {
      prompt += conversationHistory.concat([`User: ${question}`]).join("\n");
    }

    const formData = new FormData();
    formData.append("prompt", prompt);  
    if (image) {
      formData.append("image", image); 
    }

    try {
  
      const data = await sendQuestion(formData); 
      const imageUploaded = !!image;
      onResponse(data, question, imageUploaded);

      setConversationHistory(prev => [
        ...prev,
        `User: ${question}`,
        `GPT: ${data.response}`,
      ]);

      setQuestion(""); 
      setImage(null);  
      setImagePreview(null);  
    } catch (error) {
      console.error("Error al enviar la pregunta:", error);
      alert("Hubo un error al enviar la pregunta. Superaste el límite de tokens? Borra el chat y volvé a intentarlo.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
        <p>Procesando tu pregunta...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center mt-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl"
      >
        <div className="chat-input-container">
          <button
            type="button"
            className="attach-button"
            onClick={() => document.getElementById("image").click()}
          >
            <FiUploadCloud size={22} />
            <span className="upload-label-text">Subir Imagen</span>
          </button>

          <textarea
            id="question"
            rows="1"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            className="chat-textarea"
            placeholder="Escribí tu mensaje..."
            required={!image}  
          />

          <button type="submit" className="send-button">
            <FiSend size={20} color="#fff" />
          </button>
        </div>

        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden-file-input"
        />

        {imagePreview && (
          <div className="image-preview-container">
            <img
              src={imagePreview}
              alt="Vista previa"
              className="image-preview"
            />
          </div>
        )}
      </form>
    </div>
  );
} 
