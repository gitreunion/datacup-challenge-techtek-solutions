from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI application
app = FastAPI()

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,  # Allow credentials (e.g., cookies)
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)


# Define the schema for a query to the model
class Query(BaseModel):
    prompt: str  # The user input or prompt
    model: str = "llama3.1"  # Default model to use


# Define the schema for a conversation
class Conversation(BaseModel):
    id: str  # Unique identifier for the conversation
    messages: List[Dict[str, str]] = []  # List of message dictionaries


# In-memory storage for conversations
conversations: Dict[str, Conversation] = {}


@app.post("/generate")
async def generate_text(query: Query):
    """
    Generate text from a given model based on the user prompt.
    """
    try:
        # Send a POST request to the external model API
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": query.model, "prompt": query.prompt, "stream": False}
        )
        response.raise_for_status()

        # Attempt to parse the response as JSON
        try:
            json_response = response.json()
        except ValueError:
            raise HTTPException(
                status_code=500,
                detail=f"Invalid JSON response from Ollama: {response.text}"
            )

        # Return the generated text from the model
        return {"generated_text": json_response.get("response", "No response field in JSON")}
    except requests.RequestException as e:
        # Handle request errors
        raise HTTPException(
            status_code=500,
            detail=f"Error communicating with Ollama: {str(e)}"
        )


@app.get("/models")
async def list_models():
    """
    Retrieve a list of available models from the external API.
    """
    try:
        response = requests.get("http://localhost:11434/api/tags")
        response.raise_for_status()
        return {"models": response.json()["models"]}
    except requests.RequestException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching models: {str(e)}"
        )


@app.post("/models/download")
async def download_model(model_name: str):
    """
    Download a model from the external API.
    """
    try:
        response = requests.post(
            "http://localhost:11434/api/pull",
            json={"name": model_name}
        )
        response.raise_for_status()
        return {"message": f"Model {model_name} downloaded successfully"}
    except requests.RequestException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error downloading model: {str(e)}"
        )


# Define the schema for starting a conversation
class StartConversationRequest(BaseModel):
    conv_id: str  # Unique identifier for the conversation


@app.post("/conversation/start")
async def start_conversation(request: StartConversationRequest):
    """
    Start a new conversation by creating a unique conversation ID.
    """
    conv_id = request.conv_id  # Extract the conversation ID from the request
    if conv_id in conversations:
        raise HTTPException(status_code=400, detail="Conversation ID already exists")
    conversations[conv_id] = Conversation(id=conv_id)
    return {"message": f"Conversation {conv_id} started"}


@app.post("/conversation/{conv_id}/message")
async def add_message(conv_id: str, query: Query):
    """
    Add a message to an existing conversation and generate a response.
    """
    if conv_id not in conversations:
        raise HTTPException(status_code=404, detail="Conversation not found")

    # Retrieve the existing conversation
    conversation = conversations[conv_id]

    # Add the user's message to the conversation history
    conversation.messages.append({"role": "user", "content": query.prompt})

    # Build the prompt with the full conversation history
    prompt_with_history = "\n".join(
        [f"{msg['role'].capitalize()}: {msg['content']}" for msg in conversation.messages]
    )

    try:
        # Send the complete conversation history to the model
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": query.model, "prompt": prompt_with_history}
        )
        response.raise_for_status()
        generated_text = response.json()["response"]

        # Add the assistant's response to the conversation history
        conversation.messages.append({"role": "assistant", "content": generated_text})

        return {"generated_text": generated_text}
    except requests.RequestException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error communicating with Ollama: {str(e)}"
        )


@app.get("/conversation/{conv_id}")
async def get_conversation(conv_id: str):
    """
    Retrieve the full conversation history for a given conversation ID.
    """
    if conv_id not in conversations:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversations[conv_id]


# Run the FastAPI application with Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
