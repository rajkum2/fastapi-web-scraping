from getpass import getpass
import os
from langchain.chains import LLMChain
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate

# Set up the OpenAI API key in the environment
OPENAI_API_KEY = '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'  # or use your API key directly
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

# Define a PromptTemplate
template = "Create a social media post about the following news article titled '{title}' in the category '{category}':\n\n"
prompt = PromptTemplate(template=template, input_variables=["title", "category"])

# Initialize the LLMChain with the OpenAI model and your prompt
llm = OpenAI()
llm_chain = LLMChain(prompt=prompt, llm=llm)

def generate_social_media_post(title, category):
    # Generate the social media post using the LLMChain
    response = llm_chain.run({"title": title, "category": category})
    return response

