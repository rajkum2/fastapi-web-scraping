from sqlalchemy import Column, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class NewsItem(Base):
    __tablename__ = 'news_items'

    id = Column(String, primary_key=True)
    category = Column(String)
    title = Column(String)
    link = Column(String)
    image = Column(String)
    datetime_utc = Column(DateTime)