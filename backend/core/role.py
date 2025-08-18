from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi import Depends, HTTPException, status
from db.session import SessionLocal
from core.logger import get_logger
from crud.user import get_user_by_username
from typing import Optional
from jose import jwt

from core.config import settings
from db.models.user import User

security = HTTPBearer()

logger = get_logger()

def verify_token(token: str) -> Optional[str]:
    """Vérifier et décoder un token JWT"""
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        return payload.get("sub")
    except Exception:
        return None


async def check_user_role(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    db = SessionLocal()

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )


    if not credentials:
        logger.error(f"il n'y a pas de credential")
        db.close()
        raise credentials_exception

    try:
        token = credentials.credentials
        username = verify_token(token)
        logger.info(f"l'utilisateur: {username}")
        

        current_user = get_user_by_username(db, username)

        if not current_user:
            logger.info(f"l'utilisateur: {username}, n'as pas accès à cette section")

            raise HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail="Not authorized to access this resource")
        return current_user

    except Exception:
        db.close()
        raise HTTPException(status_code=401, detail="Invalid token")

async def check_admin_or_blogger_role(credentials: HTTPAuthorizationCredentials = Depends(security)):
    db = SessionLocal()

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not credentials:
        raise credentials_exception

    try:
        token = credentials.credentials
        username = verify_token(token)

        current_user = get_user_by_username(db, username)

        if not current_user:
            raise HTTPException(status_code=401, detail="should be connected")
        if  "admin" not in current_user.roles and "blogger" not in current_user.get_roles_to_list():
            logger.info(f"lutilisateur: {current_user.username}, n'as pas accès à cette section, il n'est ni admin ni bloggeur")
            raise HTTPException(status_code=403, detail="Not authorized to access this resource")
        db.close()
        return current_user

    except HTTPException:
        raise HTTPException(status_code=401, detail="Not authorized to access this resource")
    
async def check_admin_role(credentials: HTTPAuthorizationCredentials = Depends(security)):
    db = SessionLocal()

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not credentials:
        raise credentials_exception

    try:
        token = credentials.credentials
        username = verify_token(token)

        current_user = get_user_by_username(db, username)

        if not current_user:
            raise HTTPException(status_code=401, detail="should be connected")
        if "admin" in current_user.get_roles_to_list():
            logger.info(f"lutilisateur: {current_user.username}, n'as pas accès à cette section, il n'est pas un admin")
            raise HTTPException(status_code=403, detail="Not authorized to access this resource")
        db.close()
        return current_user

    except Exception:
        db.close()
        raise HTTPException(status_code=401, detail="Invalid token")
    
async def check_blogger_role(credentials: HTTPAuthorizationCredentials = Depends(security)):
    db = SessionLocal()

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not credentials:
        raise credentials_exception

    try:
        token = credentials.credentials
        username = verify_token(token)

        current_user = get_user_by_username(db, username)

        if not current_user or "blogger" in current_user.get_roles_to_list():
            logger.info(f"lutilisateur: {current_user.username}, n'as pas accès à cette section")
            raise HTTPException(status_code=403, detail="Not authorized to access this resource")
        db.close()
        return current_user

    except Exception:
        db.close()
        raise HTTPException(status_code=401, detail="Invalid token")
