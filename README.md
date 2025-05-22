# DocWave

DocWave is a web application that generates summaries from web page content using a Large Language Model (LLM). You provide a URL, and DocWave fetches the content and provides a summarized version. No bullshit frontend frameworks, just plain HTML, CSS and Javascript.

## Features

*   **URL Summarization**: Enter any publicly accessible URL to get a summary of its content.
*   **Streaming Output**: Summaries are streamed token by token for a responsive user experience.
*   **Markdown Rendering**: The generated summary is displayed as formatted Markdown.
*   **Dockerized**: The application can be easily run using Docker.

## Tech Stack

*   **Frontend**:
    *   HTML
    *   CSS (Tailwind CSS)
    *   JavaScript (vanilla)
    *   [Marked.js](https://marked.js.org/) (for Markdown rendering)
*   **Backend (Node.js Web Server)**:
    *   Node.js
    *   `dotenv` (for environment variables)
*   **Backend (Python LLM Service)**:
    *   Python
    *   FastAPI (for the API)
    *   Langchain (for LLM interaction)
    *   OpenAI (as the LLM provider)
    *   `pydantic` (for data validation)
    *   `python-dotenv` (for environment variables)
*   **Containerization**:
    *   Docker
