from fastapi import APIRouter, Depends, status
from typing import Annotated
from fastapi import Form, HTTPException
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from datetime import timedelta
from typing import List

from crud.tag import get_tag_by_name, create_tag
from deps import get_db
from schemas.tag import TagOut, TagCreate
from db.models.user import User
from core.role import check_admin_or_blogger_role

router = APIRouter()

@router.get("/{name}", response_model=TagOut)
def get_tag(name: str, db: Session = Depends(get_db)):

    dbTag = get_tag_by_name(db, name)

    if not dbTag:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="tag not found")
    return dbTag


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=TagOut)
def post_tag(tag: TagCreate, db: Session = Depends(get_db), user: User = Depends(check_admin_or_blogger_role)):

    dbTag = create_tag(db, tag)

    if not dbTag:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="INTERNAL SERVER EERROR")
    return dbTag