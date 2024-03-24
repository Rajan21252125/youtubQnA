import os
from youtube_transcript_api import YouTubeTranscriptApi
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI()

def get_video_transcript(id, languages=['hi', 'en']):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(
            id, languages=languages)
        script = " ".join([t["text"].strip()
                           for t in transcript if t["text"] != "[Music]"])
        return script
    except Exception as e:
        print("Error:", e)
        return ""


def summarizer(transcript):
    try:
        response = client.embeddings.create(
            input=transcript,
            model="text-embedding-3-small"
        )
        return response.data[0].embedding  # Return the embedding for QnA
    except Exception as e:
        print("Error:", e)
        return


summary = ""
def qna(question, transcript, summary):
    try:
        for i in range(len(transcript)):
            summary += transcript[i]
        # print(summary)
        new_transcript = summary
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": "Provide a summary of the video"},
                # Include summary
                {"role": "assistant", "content": f"{new_transcript}"},
                {"role": "user", "content": f"{question}"}
            ],
        )
        return response.choices[0].message.content.strip()  # Extract answer
    except Exception as e:
        print("Error:", e)
        return ""


# video_url = input("Enter the YouTube video URL: ")
# id = video_url.split("=")[1]

# transcript = get_video_transcript(id)

# while True:
#     question = input(
#         "Ask a question about the video (or type 'exit' to quit): ")
#     if question.lower() == "exit":
#         break
#     answer = qna(question, transcript, summary)
#     print("Answer:", answer)