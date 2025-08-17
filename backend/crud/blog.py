from typing import List
from schemas.blog import BlogOut
from db.models.blog import Blog
from sqlalchemy.orm import Session


def get_blog_by_title(db: Session, title: str):
    return db.query(Blog).filter(Blog.title == title).first()



def get_all_blog(db: Session) -> List[Blog]:
    return db.query(Blog).all()


