from openai import OpenAI


client = OpenAI()

class TextToImageAgent:
    def __init__(self):
        self.model = "gpt-4o"  # O el modelo que prefieras

    async def generate_image(self, prompt: str) -> str:
        """
        Generates an image based on a textual prompt using OpenAI API.
        Returns the URL to the generated image.
        """
        
        truncated_prompt = prompt[:2000]

        response = client.images.generate(prompt=truncated_prompt,
        n=1,
        size="1024x1024",  
        response_format="url")

        # Obtener la URL de la imagen generada
        image_url = response.data[0].url
        return image_url
