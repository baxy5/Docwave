import os
from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langchain_core.messages import SystemMessage, HumanMessage

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    print("OpenAI key not set.")

model = init_chat_model(model="gpt-4o-mini", model_provider="openai")


async def get_summary(url: str):
    # TODO: Scrape url, get site content, pass it to the LLM and then summarize
    messages = [
        SystemMessage(
            "You are a helpful assistant. You create summary about the content of the {url} provided by the user. It may not have enough context but try to summarized its content. If you're unable to create a summary, or the content of the {url} includes sexism, racism, porn, blood or killing then you must respond: I couldn't create a summary from this content. And then explain why."
        ),
        SystemMessage("The response must be in Markdown format."),
        HumanMessage(f"Create a detailed summary from the content of this url: {url}"),
    ]

    async for chunk in model.astream(messages):
        if chunk.content:
            yield f"data: {chunk.content}\n\n"
