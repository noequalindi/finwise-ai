# FinWise AI 🚀

Multi-agent LLM combining vision and text reasoning for financial chart analysis.  
Built with **FastAPI**, **React**, and **GPT-4o**.

---

## 📚 Overview

This application implements a multi-agent reasoning system:
- **VisorBot 👁️📈**: analyzes financial charts uploaded as images.
- **BrainBroker 🧠💬**: reasons and answers financial questions based on the chart analysis and the user's input.

The system combines both reasoning stages to provide a detailed final answer, leveraging the advanced capabilities of OpenAI's `gpt-4o` model.
You can ask for create an image.
It features a **chat-style frontend** displaying the conversation flow, the participating agents, and the analyzed images.

---

## 🛠️ Technologies Used

- **Backend**: FastAPI + Uvicorn
- **Frontend**: React + Vite + TailwindCSS
- **OpenAI GPT-4o API**: for multimodal reasoning (text + image)
- **ChromaDB**: (Planned for future memory management and retrieval optimization)
- **react-markdown**: to render Markdown-formatted and LaTeX responses
---

## 🚀 Installation and Setup

### 1. **Create a `.env` file**

Before starting the application, create a `.env` file in both the **frontend** and **backend** directories and populate it with the appropriate API keys (refer to `.env.example` for required variables).

### Run the App with Docker
In the root of the project run:
```bash
# Build the docker containers
docker-compose build

docker-compose up
```

### Run the App locally 

#### 1. Backend (FastAPI)

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app.main:app --reload
```
Note: Make sure you have python 3.10 or higher installed.

#### 2. Frontend (React + Vite)
📦 Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install frontend dependencies
npm install

# Run the front end server
npm run dev
```

Note: Make sure you have Node.js v20.x and npm v9.x or higher installed.


