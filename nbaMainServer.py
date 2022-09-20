from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
import requests

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/book/{name}")
async def get_book(name):
    res = requests.get('https://www.googleapis.com/books/v1/volumes?q={}'.format(name))
    return res.json()

if __name__ == "__main__":
    uvicorn.run("nbaMainServer:app", host="0.0.0.0", port=8000, reload=True)
