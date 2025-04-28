import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { FiAlertTriangle } from "react-icons/fi";
import "../styles/chat.css";

const roleLabels = {
  User: "",
  VisionArg: "VisorBot",
  TextArg: "BrainBroker",
};

const roleAvatars = {
  User: "👤",
  VisionArg: "👁️",
  TextArg: "🧠",
};

const roleBubbles = {
  User: "chat-bubble user",
  VisionArg: "chat-bubble vision",
  TextArg: "chat-bubble text",
};

export default function ChatDisplay({ messages, userName }) {
  const [finishedTyping, setFinishedTyping] = useState({});

  useEffect(() => {
    const newTyping = {};
    messages.forEach((_, idx) => {
      if (!(idx in finishedTyping)) {
        newTyping[idx] = false;
      }
    });
    setFinishedTyping((prev) => ({ ...prev, ...newTyping }));
  }, [messages]);

  return (
    <div className="w-full max-w-2xl h-[60vh] overflow-y-auto space-y-4 px-4">
      <div className="warning-container">
        <FiAlertTriangle size={24} className="warning-icon" />
        <p className="warning-text">
          El contenido expuesto en el presente chat, no es un consejo
          financiero.
        </p>
      </div>

      <div className="w-full max-w-2xl space-y-4">
        {messages.map((msg, idx) => {
          console.log(msg);
          const isUser = msg.role === "User";
          const content =
            msg.content && !msg.content?.includes("https") && msg.role !== "VisionArg"
              ? String(msg.content)
              : "";

          return (
            <div key={idx} className={`chat-message ${isUser ? "user" : ""}`}>
              <div className="chat-avatar">{roleAvatars[msg.role] || "🤖"}</div>

              <div className={roleBubbles[msg.role] || "chat-bubble"}>
                <strong className="block mb-1">
                  {isUser ? userName : roleLabels[msg.role] || msg.role}
                </strong>

                {isUser ? (
                  <div className="fade-in">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <>
                    <div className="fade-in transition-opacity duration-700">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {content}
                      </ReactMarkdown>
                    </div>


                    {msg.content?.includes("https") && (
                      <div className="image-preview-container">
                        <p className="image-caption">
                          Acá está la imagen generada:
                        </p>
                        <img
                          src={msg.content}
                          alt="Imagen generada"
                          className="image-preview"
                        />
                        <p className="image-link-text">
                          Podés descargarla en el siguiente link:
                        </p>
                        <a
                          href={msg.content}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="image-link"
                        >
                          Entrá a ver la imágen generada
                        </a>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
