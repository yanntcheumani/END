from sqlalchemy.orm import Session
from fastapi import HTTPException, status
import os
import uuid

from schemas.tag import TagCreate
from core.logger import get_logger
from db.session import SessionLocal
from db.models.blog import Blog
from db.models.user import User
from schemas.blog import BlogCreate, BlogFile
from crud.tag import create_tag

UPLOAD_DIR = "uploads"

class BlogService:
    def __init__(self, db: Session = None):
        self.db: Session = db
        self.local_db = False
        self.init_db()
        self.logger = get_logger()

    def init_db(self):
        db: Session = SessionLocal()

        if self.db:
            db.close()
            return
        self.local_db = True
        self.db = db

        
    def create_blog(self, blog: BlogCreate, picture_preview: BlogFile, video_preview: BlogFile, user: User) -> Blog:
        """
            
        """
        if not picture_preview.content:
            self.logger.error(f"{__name__} - {blog.title} : erreur picture preview manquante")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Erreur aucun fichier n'est valide")

        self.logger.info(f"Création du blog {blog.title}")
        db_blog = Blog(
                    title=blog.title, 
                    description=blog.description,
                    read_time=blog.read_time,
                    text=blog.text,
                    author_id=user.id
                )
        db_blog.author_id = 1
        self.__add_tag(blog, db_blog)
        self.logger.info(f"{__name__} - ajout des tags dans le blog finis")
        
        self.logger.info(f"{__name__} - téléchargement des fichiers")

        self.__upload_file(picture_preview)

        if video_preview.content:
            self.__upload_file(video_preview)

        db_blog.picture_preview_pathname = picture_preview.pathname
        db_blog.video_pathname = video_preview.pathname

        self.logger.info(f"{__name__} - téléchargement des fichiers")

        self.db.add(db_blog)
        self.db.commit()
        self.db.refresh(db_blog)
        return db_blog

    def __upload_file(self, content_file: BlogFile, filename: str = "") -> BlogFile:
        self.logger.info(
            f"{__name__} - {content_file.file.filename} lancement de l'upload "
            f"(type {content_file.file.content_type})"
        )

        if not content_file.content:
            self.logger.error(
                f"{__name__} - {content_file.file.filename} : erreur lors du upload"
            )
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Erreur le fichier n'est pas valide",
            )

        # Générer un nom de fichier custom
        ext = os.path.splitext(content_file.file.filename)[1]  # garder extension
        content_file.pathname = filename if filename != "" else f"{uuid.uuid4().hex}{ext}"
        save_path = os.path.join(UPLOAD_DIR, content_file.pathname)

        # Sauvegarder le fichier
        try:
            with open(save_path, "wb") as f:
                f.write(content_file.content)
            
        except Exception as e:
            self.logger.error(f"{__name__} - Erreur lors de l'écriture du fichier : {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Impossible de sauvegarder le fichier",
            )

        self.logger.info(f"{__name__} - Fichier sauvegardé sous {save_path}")

        return content_file

    def __add_tag(self, blog: BlogCreate, db_blog: Blog):
        for tmp in blog.tags:
            tag = TagCreate(name=tmp)
            db_tag = create_tag(self.db, tag)
            if not db_tag:
                self.logger.error(f"Error lors de la création du tag: {tag}")
                raise HTTPException(status_code=500, detail="INTERNAL SERVER ERROR")
            db_blog.tags.append(db_tag)

    def __del__(self):
        if self.local_db:
            self.logger.info("Suppression de local database")
            self.db.close()
