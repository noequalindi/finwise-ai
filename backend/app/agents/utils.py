import tiktoken

def count_tokens(text: str, model_name: str = "gpt-4o") -> int:
    try:
        text = text.strip()
        encoding = tiktoken.encoding_for_model(model_name)
    
        token_count = len(encoding.encode(text))
        
        return token_count
    except Exception as e:
        print(f"An error ocurred counting tokens for {model_name}: {e}")
        return 0
