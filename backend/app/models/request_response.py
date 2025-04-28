from pydantic import BaseModel
from typing import Optional

class QuestionRequest(BaseModel):
    question: str
    image_base64: Optional[str] = None

class QuestionResponse(BaseModel):
    response: str
    tokens_input: int
    tokens_reasoning: int
    tokens_output: int
    image_bytes: Optional[str] = None  

