from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain_openai import OpenAI

from langchain.agents import load_tools


import os
from dotenv import load_dotenv
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
serpapi_api_key = os.getenv("SERPAPI_KEY")

def search(query):
    llm = OpenAI(temperature=0 , api_key=OPENAI_API_KEY)

    tool_names = ["serpapi"]
    tools = load_tools(tool_names, serpapi_api_key =serpapi_api_key)

    agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True)
    ans = agent.invoke(query)
    return ans
