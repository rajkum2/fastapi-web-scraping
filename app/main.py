from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException
from .database import init_db, SessionLocal
from .models import NewsItem
from .scrapper import pages, feeds
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import logging
from fastapi import FastAPI, HTTPException
from .models import NewsItem  # or .schemas if using separate schema
from .content_generator import generate_social_media_post
from .schemas import NewsItemSchema  # Import the Pydantic schema

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL of the React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
def startup_event():
    init_db()
@app.get('/pages')
def home_pages(page: str | None = 'world'):
    data = pages(page)
    return data

@app.get('/news')
async def news(page: Optional[str] = 'world', category: Optional[str] = 'energy'):
    try:
        data = feeds(page, category)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    # Database session
    db = SessionLocal()
    try:
        for item in data["items"]:
            # Check if the item already exists in the database
            existing_item = db.query(NewsItem).filter(NewsItem.id == item['id']).first()
            if existing_item is None:
                # Item doesn't exist, proceed with adding it
                news_item = NewsItem(
                    id=item['id'],
                    category=item['category'],
                    title=item['title'],
                    link=item['link'],
                    image=item['image'],
                    datetime_utc=item.get('datetime_utc')
                )
                print(news_item.id)
                db.add(news_item)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()
    return data

@app.get('/test-insert')
def test_insert():
    db = SessionLocal()
    try:
        test_item = NewsItem(id='test1234333433', category='test23', title='Test Title', link='http://test.com', image='http://test.com/image.jpg', datetime_utc=datetime.now())
        db.add(test_item)
        db.commit()

        logger.info("Test item successfully inserted")  # Log success message
        return {"message": "Test item successfully inserted"}
    except Exception as e:
        db.rollback()
        logger.error(f"Error inserting test item: {e}")  # Log error message
        return {"error": str(e)}
    finally:
        db.close()

@app.get('/all-news')
def all_news(page: str = 'world', category: str = 'africa'):
    db = SessionLocal()
    try:
        news_items = db.query(NewsItem).all()
        return news_items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.post("/generate-social-post")
async def generate_post(news_item: NewsItemSchema):
    try:
        generated_post = generate_social_media_post(news_item.title, news_item.category)
        return {"generated_post": generated_post}
    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=str(e))
