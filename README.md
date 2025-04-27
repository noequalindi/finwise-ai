# FinWise AI 🚀

Multi-agent LLM combining vision and text reasoning for financial chart analysis.  
Built with **FastAPI**, **React**, and **GPT-4o**.

---

## 📚 Overview

This application implements a multi-agent reasoning system:
- **VisorBot 👁️📈**: analyzes financial charts uploaded as images.
- **BrainBroker 🧠💬**: reasons and answers financial questions based on the chart analysis and the user's input.

The system combines both reasoning stages to provide a detailed final answer, leveraging the advanced capabilities of OpenAI's `gpt-4o` model.

It features a **chat-style frontend** displaying the conversation flow, the participating agents, and the analyzed images.

---

## 🛠️ Technologies Used

- **Backend**: FastAPI + Uvicorn
- **Frontend**: React + Vite + TailwindCSS
- **OpenAI GPT-4o API**: for multimodal reasoning (text + image)
- **ChromaDB** (optional for future memory management)
- **react-markdown**: to render Markdown-formatted responses
- **react-simple-typewriter**: typing animation effect

---

## 🚀 Installation and Setup

### 1. Backend (FastAPI)

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
