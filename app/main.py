from fastapi import FastAPI
from .database import init_db
from .scrapper import pages, feeds

app = FastAPI()

@app.on_event("startup")
def startup_event():
    init_db()
@app.get('/pages')
def home_pages(page: str | None = 'world'):
    data = pages(page)
    return data

@app.get('/news')
def news(page: str | None = 'world', category: str | None = 'africa'):
    data = feeds(page, category)
    return data
