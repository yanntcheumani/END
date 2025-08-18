from fastapi import APIRouter, Depends, status
from typing import Annotated
from fastapi import Form, HTTPException
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from datetime import timedelta
from typing import List

from crud.tag import get_tag_by_name, create_tag, get_all_tag
from deps import get_db
from schemas.tag import TagOut, TagCreate
from db.models.user import User
from core.role import check_admin_or_blogger_role, check_user_role

router = APIRouter()

@router.get("/{name}", response_model=TagOut)
def get_tag(name: str, db: Session = Depends(get_db)):

    dbTag = get_tag_by_name(db, name)

    if not dbTag:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="tag not found")
    return dbTag


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=TagOut)
def post_tag(tag: TagCreate, db: Session = Depends(get_db), user: User = Depends(check_user_role)):#user: User = Depends(check_admin_or_blogger_role)):

    dbTag = create_tag(db, tag)

    if not dbTag:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="INTERNAL SERVER EERROR")
    return dbTag

@router.get("/", status_code=status.HTTP_201_CREATED, response_model=List[TagOut])
def get_tags(db: Session = Depends(get_db)):
    db_tags = get_all_tag(db)

    return db_tags
