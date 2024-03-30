<<<<<<< HEAD
import requests
=======
from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain_openai import OpenAI

from langchain.agents import load_tools

>>>>>>> 077e2fcaf9ee2f1d487e6b67fe2effcd9b930cc5
import os
from dotenv import load_dotenv
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # Use OPENAI_KEY for consistency

def search(query):
    llm = OpenAI(temperature=0)

    tool_names = ["serpapi"]
    tools = load_tools(tool_names)

    agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True)

<<<<<<< HEAD
def results(query):
    # Example usage.0
    search_results = search_google(query)
    description = search_results['knowledge_graph']['description']
    source = search_results['knowledge_graph']['source']

    question = []
    for i in search_results['related_questions']:
        question.append(i['question'])

    return description, source, question
=======
    ans = agent.invoke(query)
    return ans
>>>>>>> 077e2fcaf9ee2f1d487e6b67fe2effcd9b930cc5
