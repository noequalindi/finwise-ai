function formatRole(role) {
    switch (role) {
      case "User":
        return "👤 Vos";
      case "VisionArg":
        return "👁️📈 VisorBot";
      case "TextArg":
        return "🧠💬 BrainBroker";
      default:
        return role;
    }
  }
  
  export default function ChatDisplay({ messages }) {
    return (
      <div className="mt-8 w-full max-w-2xl space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-md shadow-md ${
              msg.role === "User" ? "bg-blue-100 text-blue-800" :
              msg.role === "VisionArg" ? "bg-green-100 text-green-800" :
              "bg-yellow-100 text-yellow-800"
            }`}
          >
            <strong>{formatRole(msg.role)}:</strong> {msg.content}
          </div>
        ))}
      </div>
    );
  }
  