from pydantic import BaseModel
from datetime import datetime

class NewsItemSchema(BaseModel):
    id: str
    category: str
    title: str
    link: str
    image: str
    datetime_utc: datetime

class ContentSchema(BaseModel):
    content: str

class Config:
    orm_mode = True  # This allows the model to work with ORM objects