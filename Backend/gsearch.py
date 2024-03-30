import requests
import os
from dotenv import load_dotenv
load_dotenv()

# Replace 'YOUR_API_KEY' with your actual API key
api_key = os.getenv("SERPAPI_KEY")
api_url = 'https://serpapi.com/search'


def search_google(query):
    params = {
        'engine': 'google',
        'q': query,
        'api_key': api_key
    }

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()  # Raise an exception for bad status codes (4xx or 5xx)
        data = response.json()
        return data  # You may want to extract and process this data further
    except requests.RequestException as e:
        print('Error searching Google:', e)
        return None

def results(query):
    # Example usage.0
    search_results = search_google(query)
    description = search_results['knowledge_graph']['description']
    source = search_results['knowledge_graph']['source']

    question = []
    for i in search_results['related_questions']:
        question.append(i['question'])

    return description, source, question