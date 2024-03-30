from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain_openai import OpenAI

from langchain.agents import load_tools

import os
from dotenv import load_dotenv
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # Use OPENAI_KEY for consistency

def search(query):
    llm = OpenAI(temperature=0)

    tool_names = ["serpapi"]
    tools = load_tools(tool_names)

    agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True)

    ans = agent.invoke(query)
    return ans