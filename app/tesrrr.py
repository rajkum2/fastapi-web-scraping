from datetime import datetime
from typing import Any
from .models import NewsItem
from .database import SessionLocal
import requests
from bs4 import BeautifulSoup as Soup
from pytz import timezone, UTC

URL = 'https://www.reuters.com'
TIMEZONE = 'Africa/Kampala'


def pages(page: str) -> dict[Any]:
    request = requests.get(f'{URL}/{page}')
    html = Soup(request.content, 'html.parser')
    # buttons with attr data test id = TextButton
    buttons = html.find_all('button', {'data-testid': 'TextButton'})
    data = []

    for (index, button) in enumerate(buttons):
        row = {'id': index + 1, 'name': None, 'description': None, 'query': None}
        if button.has_attr('data-id'):
            (_, category) = button['data-id'].strip('/').split('/')
            row['name'] = category
            row['description'] = button.text
            row['query'] = f'?page={page}&category={category}'
            data.append(row)
    return {'total': len(data), 'page': page, 'items': data}


def feeds(page: str, category: str) -> dict[Any]:
    req = requests.get(f'{URL}/{page}/{category}')
    html = Soup(req.content, 'html.parser')
    db = SessionLocal()
    # get all divs with data-testid="MediaStoryCard"
    cards = html.find_all('li', id=True)
    data = []
    try:
        for (index, card) in enumerate(cards):
            row = {'id': card['id'], 'category': None, 'title': None, 'link': None, 'image': None, 'datetime': None}
            # get image url
            image = card.find('img')
            row['image'] = image['src'] if image else None
            # get heading and a link
            h3 = card.find('h3', {'data-testid': 'Heading'})
            if h3:
                row['title'] = h3.text
                a = h3.find('a', {'data-testid': 'Link'})
                row['link'] = a['href']
            label = card.find('span', {'data-testid': 'Label'})
            if label:
                row['category'] = label.text.replace('category', '')
                if '·' in row['category']:
                    row['category'] = row['category'].split('·')[0].strip()
            if row['title']:
                data.append(row)
            time = card.find('time', {'data-testid': 'Label'})
            if time:
                row['datetime'] = time['datetime']
                date = datetime.strptime(row['datetime'], "%Y-%m-%dT%H:%M:%SZ")
                date_utc = date.replace(tzinfo=UTC)
                row['datetime_utc'] = date_utc.astimezone(timezone(TIMEZONE))
                row['datetime'] = date
                # Check if the item already exists in the database
                existing_item = db.query(NewsItem).filter(NewsItem.id == row['id']).first()
                if existing_item is None:
                    # Item doesn't exist, proceed with adding it
                    news_item = NewsItem(
                        id=row['id'],
                        category=row['category'],
                        title=row['title'],
                        link=row['link'],
                        image=row['image'],
                        datetime_utc=row['datetime_utc']  # Assuming this field exists in your model
                    )
                    db.add(news_item)
             data.append(row)
          db.commit()
    except Exception as e:
        db.rollback()  # Roll back in case of error
        raise e
    finally:
        db.close()
    return {
        'total': len(data), 'source': URL, 'page': page,
        'category': category, 'items': data
    }
