from fastapi import FastAPI, HTTPException
from .database import init_db, SessionLocal
from .models import NewsItem
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
    # Database session
    db = SessionLocal()
    try:
        for item in data["items"]:
            news_item = NewsItem(
                id=item['id'],
                category=item['category'],
                title=item['title'],
                link=item['link'],
                image=item['image'],
                datetime_utc=item.get('datetime_utc')
            )
            db.add(news_item)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()
    return data

