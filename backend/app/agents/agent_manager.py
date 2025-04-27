from app.agents.text_agent import TextAgent
from app.agents.vision_agent import VisionAgent
from app.models.request_response import QuestionResponse

class AgentManager:
    def __init__(self):
        self.text_agent = TextAgent()
        self.vision_agent = VisionAgent()

    async def handle_request(self, question: str, image_bytes: bytes = None) -> QuestionResponse:
        reasoning_text = ""
        tokens_reasoning = 0

        if image_bytes:
            vision_analysis, tokens_vision = await self.vision_agent.analyze_image(image_bytes)
            tokens_reasoning += tokens_vision
            reasoning_text += f"Análisis del gráfico:\n{vision_analysis}\n\n"

        # combine the reasoning text with the question
        combined_prompt = reasoning_text + question

        final_response, tokens_input, tokens_output = await self.text_agent.answer_question(combined_prompt)

        return QuestionResponse(
            response=final_response,
            tokens_input=tokens_input,
            tokens_reasoning=tokens_reasoning,
            tokens_output=tokens_output,
        )
