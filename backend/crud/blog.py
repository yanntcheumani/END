from typing import List
from schemas.blog import BlogOut


def get_blog_by_title(db, title: str):
    return db.query(Blog).filter(Blog.title == title).first()



def get_all_blog(db) -> List[BlogOut]:
    return None

