from fastapi import APIRouter, Depends, status
from fastapi import Form, HTTPException
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import List

from db.models.user import User
from core.role import check_admin_or_blogger_role
from crud.blog import get_blog_by_title
from deps import get_db
from schemas.blog import BlogOut, BlogCreate

router = APIRouter()

@router.get("/{title}", response_model=BlogOut)
def get_blog(title: str, db: Session = Depends(get_db)):
    dbBlog = get_blog_by_title(db, title)

    if not dbBlog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")
    return dbBlog


@router.get("/", response_model=List[BlogOut])
def get_all_blog(db: Session = Depends(get_db)) -> List[BlogCreate]:
    ret = []

    return ret

@router.post("/", response_model=BlogOut)
def post_blog(blogin: BlogCreate, db: Session = Depends(get_db), user: User = Depends(check_admin_or_blogger_role)):
    return {}