from app.agents.text_agent import TextAgent
from app.agents.vision_agent import VisionAgent
from app.agents.text_to_image_agent import TextToImageAgent
from app.models.request_response import QuestionResponse
from app.agents.utils import count_tokens

class AgentManager:
    def __init__(self):
        self.text_agent = TextAgent()
        self.vision_agent = VisionAgent()
        self.text_to_image_agent = TextToImageAgent() 

    async def handle_request(self, question: str, image_bytes: bytes = None) -> QuestionResponse:
        reasoning_text = ""
        tokens_reasoning = 0
        tokens_input = 0

        if "crear imagen" in question or "generar imagen" or "crear grafico" in question:
            image_prompt = "Generar una imagen en base a esta descripcion: " + question
            image_url = await self.text_to_image_agent.generate_image(image_prompt)

            return QuestionResponse(
                response=image_url,
                tokens_input=tokens_input,
                tokens_reasoning=tokens_reasoning,
                tokens_output=0,
                image_url=image_url 
            )

        if image_bytes:
            vision_analysis, tokens_vision = await self.vision_agent.analyze_image(image_bytes)
            tokens_reasoning += tokens_vision
            reasoning_text += f"Análisis del gráfico:\n{vision_analysis}\n\n"
            tokens_input = count_tokens(question)

            return QuestionResponse(
                response=reasoning_text,
                tokens_input=tokens_input,
                tokens_reasoning=tokens_reasoning,
                tokens_output=0,
            )

        tokens_input = count_tokens(question)

        combined_prompt = reasoning_text + question
        final_response, tokens_input_from_text, tokens_output = await self.text_agent.answer_question(combined_prompt)

        tokens_input += tokens_input_from_text

        return QuestionResponse(
            response=final_response,
            tokens_input=tokens_input,
            tokens_reasoning=tokens_reasoning,
            tokens_output=tokens_output,
        )
