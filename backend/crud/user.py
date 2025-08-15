from sqlalchemy.orm import Session

from core.logger import get_logger
from crud.role import EnumRole, get_role
from db.models.user import User
from db.models.role import Role
from schemas.user import UserCreate
from core.security import get_password_hash

logger = get_logger(__name__)

def create_user(db: Session, user_in: UserCreate) -> User:
    hashed_pw = get_password_hash(user_in.password)
    db_user = User(email=user_in.email, hashed_password=hashed_pw, username=user_in.username)

    user_role = get_role(db, EnumRole.USER)

    if user_role:
        db_user.roles.append(user_role)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str) -> User:
    logger.info(f"get_user_by_email - voici le mail que je dois chercher: {email}")
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, user_id: int) -> User:
    logger.info(f"get_user_by_id - voici l'id que je dois chercher: {user_id}")
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_username(db: Session, username: str) -> User:
    logger.info(f"get_user_by_username - voici l'username que je dois chercher: {username}")

    return db.query(User).filter(User.username == username).first()


