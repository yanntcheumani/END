from fastapi import APIRouter, Depends, status
from typing import Annotated
from fastapi import Form, HTTPException
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from datetime import timedelta

from core.security import create_access_token
from core.config import settings
from db.models.user import User
from schemas.user import UserCreate, UserOut
from crud import user as crud_user
from crud.auth import authenticate_user, get_current_user
from deps import get_db
from core.role import check_admin_role

router = APIRouter()

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):

    """
    Create a new user.
    """
    try:
        db_user = crud_user.get_user_by_email(db, user_in.email)

        if db_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
        db_user = crud_user.create_user(db, user_in)

        return UserOut(id=db_user.id, email=db_user.email, username=db_user.username, role=db_user.get_roles_to_list())
    except HTTPException:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/create/blogger", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_blogger(user_in: UserCreate, db: Session = Depends(get_db), current_user: User = Depends(check_admin_role)):
    try:
        db_user = crud_user.get_user_by_email(db, user_in.email)

        if db_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
        db_user = crud_user.create_blogger(db, user_in)

        return UserOut(id=db_user.id, email=db_user.email, username=db_user.username, role=db_user.get_roles_to_list())
    except HTTPException:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/create/admin", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_blogger(user_in: UserCreate, db: Session = Depends(get_db), current_user: User = Depends(check_admin_role)):
    try:
        db_user = crud_user.get_user_by_email(db, user_in.email)

        if db_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
        db_user = crud_user.create_admin(db, user_in)

        return UserOut(id=db_user.id, email=db_user.email, username=db_user.username, role=db_user.get_roles_to_list())
    except HTTPException:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/login", status_code=status.HTTP_200_OK)
def login(username: Annotated[str, Form()], password: Annotated[str, Form()], db: Session = Depends(get_db)):
    user = authenticate_user(db, username, password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "type": "Bearer"}

@router.get("/me", response_model=UserOut)
def get_user(current_user: User = Depends(get_current_user)):
    return UserOut(id=current_user.id, email=current_user.email, username=current_user.username, role=current_user.get_roles_to_list())
