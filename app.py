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


@app.route("/plants", methods=["GET"])
def get_plants():
    # Dummy data for plants
    plants = [
        {
            "name": "Tulsi",
            "type": "Immunity",
            "description": "Holy basil known for immune-boosting properties.",
            "benefits": ["Boosts immunity", "Reduces stress", "Antioxidant"],
            "usage": "Drink as tea or chew leaves."
        },
        {
            "name": "Neem",
            "type": "Skin",
            "description": "Neem tree leaves and oil for skin health.",
            "benefits": ["Treats acne", "Antibacterial", "Anti-inflammatory"],
            "usage": "Apply oil or use in soaps."
        },
        {
            "name": "Aloe Vera",
            "type": "Skin",
            "description": "Succulent plant for skin and digestive health.",
            "benefits": ["Soothes burns", "Hydrates skin", "Aids digestion"],
            "usage": "Apply gel topically or drink juice."
        }
    ]
    return jsonify(plants)


@app.route("/remedies", methods=["GET"])
def get_remedies():
    # Dummy data for remedies
    remedies = [
        {
            "name": "Cold Relief Tea",
            "type": "Cold",
            "ingredients": ["Ginger", "Honey", "Lemon"],
            "instructions": "Boil ginger, add honey and lemon. Drink warm.",
            "benefits": "Relieves cold symptoms and boosts immunity."
        },
        {
            "name": "Skin Rash Paste",
            "type": "Skin",
            "ingredients": ["Neem leaves", "Turmeric", "Coconut oil"],
            "instructions": "Grind ingredients into paste and apply.",
            "benefits": "Reduces inflammation and fights infection."
        }
    ]
    return jsonify(remedies)


@app.route("/doctors", methods=["GET"])
def get_doctors():
    # Dummy data for doctors
    doctors = [
        {
            "name": "Dr. Sarah Johnson",
            "specialization": "Naturopathic Medicine",
            "experience": "10 years",
            "phone": "+1-555-0123",
            "img": "https://via.placeholder.com/150"
        },
        {
            "name": "Dr. Michael Chen",
            "specialization": "Herbal Medicine",
            "experience": "8 years",
            "phone": "+1-555-0456",
            "img": "https://via.placeholder.com/150"
        }
    ]
    return jsonify(doctors)


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    
    # Dummy signup logic - in real app, save to database
    if name and email and password:
        return jsonify({"msg": "Signup successful!"})
    else:
        return jsonify({"msg": "Invalid data"}), 400


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    # Dummy login logic - in real app, check database
    if email == "test@example.com" and password == "password":
        return jsonify({"msg": "ok"})
    else:
        return jsonify({"msg": "Invalid credentials"}), 401


@app.route("/addFeedback", methods=["POST"])
def add_feedback():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    
    # Dummy feedback logic - in real app, save to database
    if name and email and message:
        return jsonify({"msg": "Thank you for your feedback!"})
    else:
        return jsonify({"msg": "Invalid data"}), 400
