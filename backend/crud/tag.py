from schemas.tag import TagCreate
from db.models.tag import Tag
from sqlalchemy.orm import Session
from core.logger import get_logger

logger = get_logger(__name__)

def create_tag(db: Session, tag: TagCreate):
    db_tag = get_tag_by_name(db, tag.name.strip())
    if db_tag:
        logger.info(f"create_tag - voici le tag que j'ai trouvé: {tag}")
        return db_tag
    
    db_tag = Tag(name=tag.name)

    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)

    logger.info(f"create_tag - voici le tag que j'ai créé: {tag}")

    return db_tag

def get_tag_by_name(db: Session, name: str) -> Tag:
    logger.info("recherche du tag")
    dbTag = db.query(Tag).filter(Tag.name == name).first()
    if not dbTag:
        return None
    logger.info(f"tag trouvé: {dbTag}")

    return dbTag
def get_all_tag(db: Session):
    return db.query(Tag).all()
