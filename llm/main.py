from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agent import get_summary

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:6543"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UrlRequest(BaseModel):
    url: str


@app.post("/")
async def summary(req: UrlRequest):
    return StreamingResponse(
        get_summary(req.url), media_type="text/event-stream"
    )
