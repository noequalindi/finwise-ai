import openai
import base64
import os


class VisionAgent:
    def __init__(self):
        self.model = "gpt-4o"

    async def analyze_image(self, image_bytes: bytes):
        """
        Analiza una imagen enviada y devuelve un resumen del contenido observado.
        """
        base64_image = base64.b64encode(image_bytes).decode('utf-8')

        # send image + prompt in spanish to GPT-4o
        response = openai.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "Sos un analista experto en graficos sobre economia y finanzas. Observa la imagen y describe la tendencia, soportes y resistencias. Responde en lenguaje coloquial argentino. Responde razonando paso a paso en lenguaje coloquial argentino. Usá emojis donde sea útil para ilustrar tendencias, emociones o acciones (por ejemplo: 📈, 📉, 💰, ❗, 🤔, etc.). Sé claro, conciso y natural."},
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Analiza el siguiente gráfico:"},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/png;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            temperature=0.2,
            max_tokens=5000,
        )

        vision_response = response.choices[0].message.content

        # used tokens for the image analysis
        usage = response.usage
        tokens_used = usage.prompt_tokens + usage.completion_tokens

        return vision_response, tokens_used
