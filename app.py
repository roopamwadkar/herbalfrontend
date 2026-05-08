from flask import Flask, request, jsonify, render_template # type: ignore
from flask_cors import CORS # type: ignore
from dotenv import load_dotenv, find_dotenv # type: ignore
from groq import Groq # type: ignore
import os

load_dotenv(find_dotenv())

app = Flask(__name__, template_folder='templates')
CORS(app)  # <-- Enable CORS for all routes and origins

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    query = data.get("query")
    context = data.get("context", [])

    summarized_context = " ".join(context)

    prompt = f"""
You are a medicinal plant expert. Answer the question strictly based on the context below.
Focus only on the medicinal uses of plants mentioned, their home remedies, and practical applications.
Do NOT include generic lines, disclaimers, or filler phrases such as "this is the information asked".
Provide clear, concise, and actionable information.

Context:
{summarized_context}

Question:
{query}
"""

    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.3-70b-versatile",
        stream=False,
    )

    return jsonify({"response": chat_completion.choices[0].message.content})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
