from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.agents.agent_manager import AgentManager
from app.models.request_response import QuestionResponse
import uvicorn
from dotenv import load_dotenv
import os
import openai

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

print(f"OpenAI API Key: {openai.api_key}")
app = FastAPI(
    title="Razonamiento Avanzado API",
    description="API para resolver preguntas complejas usando razonamiento de texto e imagen (criptoanálisis).",
    version="1.0.0",
)

# Allow access CORS to frontend in React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Agent manager instance
agent_manager = AgentManager()

@app.post("/ask", response_model=QuestionResponse)
async def ask_question(
    prompt: str = Form(...),  # Recibir el prompt concatenado
    image: UploadFile = File(None)  # Recibir la imagen si se envía
):
    """
    Endpoint principal: recibe un 'prompt' con la pregunta y el nombre del usuario, y opcionalmente una imagen.
    Devuelve la respuesta razonada y estadísticas de tokens.
    """
    image_bytes = await image.read() if image else None

    # No es necesario preprocesar el 'prompt' porque ya se procesó en el frontend
    result = await agent_manager.handle_request(prompt, image_bytes)

    return JSONResponse(content={"response": result.response, "tokens_input": result.tokens_input, "tokens_reasoning": result.tokens_reasoning, "tokens_output": result.tokens_output})


# Run the app with uvicorn locally
if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
