import openai
import os

# Configurar API Key de OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

class TextAgent:
    def __init__(self):
        self.model = "gpt-4o"

    async def answer_question(self, prompt: str):
        """
        Envía solo el texto combinado (análisis visión + pregunta original) a GPT-4o.
        """
        response = openai.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "Sos un experto en finanzas y economía, responde razonando paso a paso en lenguaje coloquial argentino. Usá emojis donde sea útil para ilustrar tendencias, emociones o acciones. Sé claro, conciso y natural."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=1200,
        )

        message = response.choices[0].message.content

        usage = response.usage
        tokens_input = usage.prompt_tokens
        tokens_output = usage.completion_tokens

        return message, tokens_input, tokens_output
