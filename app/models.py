from sqlalchemy import Column, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Integer, Text

Base = declarative_base()

class NewsItem(Base):
    __tablename__ = 'news_items'

    id = Column(String, primary_key=True)
    category = Column(String)
    title = Column(String)
    link = Column(String)
    image = Column(String)
    datetime_utc = Column(DateTime)


class AIGenContent(Base):
    __tablename__ = 'ai_gen_content'
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)