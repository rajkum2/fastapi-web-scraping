import os
import openai
from langchain.llms import OpenAI as LangChainOpenAI

openai.api_key = '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'

lc_openai = LangChainOpenAI()
def generate_social_media_post(title, category):
    prompt = f"Create a social media post about the following news article titled '{title}' in the category '{category}':"
    print('generate post')

    # Using LangChain's OpenAI LLM for generating the response
    response = lc_openai.complete(
        prompt=prompt,
        max_tokens=150  # You can adjust the max tokens as needed
    )

    return response
