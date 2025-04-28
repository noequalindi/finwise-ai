import '../styles/summary.css'; 
export default function TokenSummary({ tokenInfo }) {
    if (!tokenInfo) return null;
  
    return (
    <div className='token-summary-container'>
      <div className="w-full max-w-3xl mt-8 p-6 bg-white rounded-xl shadow-md text-gray-800">
        <h3 className="text-lg font-bold mb-4 text-center">📊 Tokens Summary</h3>
        <div className="space-y-2 text-md">
          <p><strong>🎯 Tokens Entrada:</strong> {tokenInfo.tokens_input}</p>
          <p><strong>🧠 Tokens Razonamiento:</strong> {tokenInfo.tokens_reasoning}</p>
          <p><strong>📤 Tokens Salida:</strong> {tokenInfo.tokens_output}</p>
        </div>
      </div>
      </div>
    );
  }
  