import os
from youtube_transcript_api import YouTubeTranscriptApi
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI()

# Global variable to store the transcript
transcript_cache = {}

def get_video_transcript(id, languages=['hi', 'en']):
    # Check if transcript is already cached
    try:
        if id in transcript_cache:
            return transcript_cache[id]
        
        # If not cached, retrieve transcript and store in cache
        transcript = YouTubeTranscriptApi.get_transcript(id, languages=languages)
        script = " ".join([t["text"].strip() for t in transcript if t["text"] != "[Music]"])
        transcript_cache[id] = script
        return script
    except Exception as e:
        return e

def get_summary(transcript):
    try:
        if transcript:
            response = client.embeddings.create(
                input=transcript,
                model="text-embedding-3-small"
            )
            return response.data[0].embedding
    except Exception as e:
        print(f"Error generating summary: {e}")
        return e


def qna(question, id):
    transcript = get_video_transcript(id)
    summary = get_summary(transcript)
    if summary:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": "Provide a summary of the video"},
                {"role": "assistant", "content": f"{transcript}"},
                {"role": "user", "content": f"{question}"}
            ],
        )
        return response.choices[0].message.content.strip()
    else:
        return "Transcript is empty or unavailable."
