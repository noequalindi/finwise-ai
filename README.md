# FinWise AI 🚀

Multi-agent LLM combining vision and text reasoning for financial chart analysis.  
Built with **FastAPI**, **React**, and **GPT-4o**.

---

## 📚 Overview

This application implements a multi-agent reasoning system:
- **VisorBot 👁️📈**: analyzes financial charts uploaded as images and creates images.
- **BrainBroker 🧠💬**: reasons and answers financial questions based on the chart analysis and the user's input.

The system combines both reasoning stages to provide a detailed final answer, leveraging the advanced capabilities of OpenAI's `gpt-4o` model.
You can ask for create an image.
It features a **chat-style frontend** displaying the conversation flow, the participating agents, and the analyzed images.

---

<img width="1432" alt="image" src="https://github.com/user-attachments/assets/16121b80-da77-4b51-ba61-a839d4efa5f7" />

https://github.com/user-attachments/assets/af0cdfd0-eee9-4154-ad1f-d6a50f1ed26b


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

## Videos 📸
[Link to google drive](https://drive.google.com/drive/folders/1c0z_Y9Xgi7dF6Q4MJia6dIgm6RgNLxHN?usp=sharing)

Chatting about finances: 

https://github.com/user-attachments/assets/61dacbfe-74a8-4ff0-9ea2-3994967623ba

Loading image:

https://github.com/user-attachments/assets/c6635788-a2fd-4621-84a4-4ff5654fce51

Creating Image:

https://github.com/user-attachments/assets/f0897ee0-0876-4f79-9bb6-066d1b50b95e

### Architecture of LLM Agents and App

<a href="https://github.com/user-attachments/assets/021148b6-e2da-436f-b682-ae6d587fb9eb">
  <img src="https://github.com/user-attachments/assets/021148b6-e2da-436f-b682-ae6d587fb9eb" width="300" />
</a>

![diagram-app](https://github.com/user-attachments/assets/a6f7d4ff-9acd-478b-adea-4327d2e52b7c)
