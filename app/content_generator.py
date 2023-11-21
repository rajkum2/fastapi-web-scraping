import os
import openai
from langchain.llms import OpenAI
import openai

openai.api_key = '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'
def generate_social_media_post(title, category):
    prompt = f"Create a social media post about the following news article titled '{title}' in the category '{category}':"
    print('generate post')
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return response['choices'][0]['message']['content']
