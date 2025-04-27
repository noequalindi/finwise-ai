from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.agents.agent_manager import AgentManager
from app.models.request_response import QuestionResponse
import uvicorn

app = FastAPI(
    title="Razonamiento Avanzado API",
    description="API para resolver preguntas complejas usando razonamiento de texto e imagen (criptoanálisis).",
    version="1.0.0",
)

# allow access CORS to frontend in React 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# agent manager instance
agent_manager = AgentManager()

@app.post("/ask", response_model=QuestionResponse)
async def ask_question(
    question: str = Form(...),
    image: UploadFile = File(None)
):
    """
    Endpoint principal: recibe una pregunta (texto) y opcionalmente una imagen.
    Devuelve la respuesta razonada y estadísticas de tokens.
    """
    # checks the image 
    image_bytes = await image.read() if image else None

    # process the question
    result = await agent_manager.handle_request(question, image_bytes)

    return JSONResponse(content=result.dict())

# to run the app with uvicorn locally
if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
