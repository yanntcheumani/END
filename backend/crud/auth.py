from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from typing import Annotated
from jose import jwt
from fastapi.security import OAuth2PasswordBearer

from core.logger import get_logger
from crud.user import get_user_by_username
from core.security import verify_password
from core.config import settings
from crud.user import get_user_by_username
from db.session import SessionLocal
from deps import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")
logger = get_logger(__name__)

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
        logger.info("get_current_user - loading jwt")
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username = payload.get("sub")
        if username is None:
            logger.error("get_current_user - username pas trouvé")
            raise credentials_exception
        logger.info("get_current_user - username found")

    except Exception:
        raise credentials_exception

    logger.info("get_current_user - recherche de l'utilisateur")
    user = get_user_by_username(db, username)
    if user is None:
        logger.error("get_current_user - utilisateur non trouvé")

        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=f"Could not validate credentials {username}",
        headers={"WWW-Authenticate": "Bearer"},
    )
    logger.info("get_current_user - utilisateur trouvé")

    return user
