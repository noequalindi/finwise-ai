import tiktoken

def count_tokens(text: str, model_name: str = "gpt-4o") -> int:
    """Cuenta los tokens usados en un texto dado un modelo."""
    encoding = tiktoken.encoding_for_model(model_name)
    return len(encoding.encode(text))
