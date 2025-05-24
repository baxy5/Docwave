import os
from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langchain_core.messages import SystemMessage, HumanMessage
from scrapling.fetchers import Fetcher


load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    print("OpenAI key not set.")

model = init_chat_model(model="gpt-4o-mini", model_provider="openai")


async def scrape_url(url: str):
    page = Fetcher.get(url, stealthy_headers=True)
    result = page.get_all_text(ignore_tags=("script", "style"))
    return result


async def get_summary(url: str):
    url_content = await scrape_url(url)

    messages = [
        SystemMessage(
            "You are a helpful assistant. You create summary about the text provided by the user. If you're unable to create a summary, or the content contains sexism, racism, porn, blood or killing then you must respond: I couldn't create a summary from this content."
        ),
        SystemMessage("The response must be in Markdown format."),
        HumanMessage(
            f"Create a detailed summary from the content of this text: {url_content}"
        ),
    ]

    async for chunk in model.astream(messages):
        if chunk.content:
            yield f"data: {chunk.content}\n\n"
