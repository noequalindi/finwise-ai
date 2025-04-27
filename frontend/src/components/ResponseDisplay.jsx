export default function ResponseDisplay({ response }) {
    if (!response) return null;
  
    return (
      <div className="mt-8 p-6 bg-white rounded shadow-md space-y-4 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-gray-800">Respuesta:</h2>
        
        <div className="prose prose-sm text-gray-700">
          <ReactMarkdown>
            {response.response}
          </ReactMarkdown>
        </div>
  
        <div className="pt-4 border-t mt-4 text-gray-600 text-sm">
          <p><strong>Tokens Entrada:</strong> {response.tokens_input}</p>
          <p><strong>Tokens Razonamiento:</strong> {response.tokens_reasoning}</p>
          <p><strong>Tokens Salida:</strong> {response.tokens_output}</p>
        </div>
      </div>
    );
  }
  