from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from typing import Annotated
from jose import jwt
from fastapi.security import OAuth2PasswordBearer

from crud.user import get_user_by_username
from core.security import verify_password
from core.config import settings
from crud.user import get_user_by_username
from db.session import SessionLocal
from deps import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return None

    if not verify_password(password, user.hashed_password):
        return None
    return user

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        
    except Exception:
        raise credentials_exception

    user = get_user_by_username(db, username)
    if user is None:
        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=f"Could not validate credentials {username}",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return user
