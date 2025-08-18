from fastapi import APIRouter, Depends, status, File, UploadFile
from fastapi import Form, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List

from services.blog import BlogService, UPLOAD_DIR
from db.models.user import User
from db.models.blog import Blog
from core.role import check_admin_or_blogger_role
from crud.blog import get_blog_by_title, get_all_blog
from deps import get_db
from schemas.blog import BlogOut, BlogCreate, BlogFile
import os

router = APIRouter()


@router.get("/{title}", response_model=BlogOut)
def get_blog(title: str, db: Session = Depends(get_db)):
    db_blog = get_blog_by_title(db, title)

    if not db_blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")
    return BlogOut(
        title=db_blog.title,
        description=db_blog.description,
        read_time=db_blog.read_time,
        text=db_blog.text,
        video_url=db_blog.video_pathname,
        picture_preview_url=db_blog.picture_preview_pathname,
        author_name=db_blog.author.username,
        tags=db_blog.get_all_tags()
    )

@router.get("/", response_model=List[BlogOut])
async def get_blogs(db: Session = Depends(get_db)) -> List[BlogCreate]:
    db_blogs = get_all_blog(db)
    blogs: List[BlogOut] = []

    for blog in db_blogs:
        blogs.append(
            BlogOut(
                title=blog.title,
                description=blog.description,
                read_time=blog.read_time,
                text=blog.text,
                video_url=blog.video_pathname,
                picture_preview_url=blog.picture_preview_pathname,
                author_name=blog.author.username,
                tags=blog.get_all_tags()
            )
        )
    
    return blogs

@router.post("/", response_model=BlogOut)
async def post_blog(
    title: str = Form(...),
    description: str = Form(...),
    read_time: int = Form(...),
    text: str = Form(...),
    tags: List[str] = Form(...),
    picture_preview_file: UploadFile = File(None),
    video_file: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(check_admin_or_blogger_role)
):
    
    blog =  BlogCreate(
                    title=title, 
                    description=description, 
                    read_time=read_time, 
                    picture_preview_file=picture_preview_file,
                    video_file=video_file, text=text,
                    tags=tags
            )
    blogService = BlogService(db)
    picture_preview_content = None
    video_preview_content = None
    if blog.picture_preview_file:
        picture_preview_content = await picture_preview_file.read()
    if blog.video_file:
        video_preview_content = await video_file.read()
    picture_preview = BlogFile(content=picture_preview_content, file=picture_preview_file)
    video_preview = BlogFile(content=video_preview_content, file=video_file)
    db_blog: Blog = blogService.create_blog(blog, picture_preview, video_preview, current_user)

    return BlogOut(
        title=db_blog.title,
        description=db_blog.description,
        read_time=db_blog.read_time,
        text=db_blog.text,
        video_url=video_preview.pathname,
        picture_preview_url= picture_preview.pathname,
        author_name=db_blog.author.username,
        tags=[]
    )

@router.get("/files/{filename}")
async def get_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Fichier introuvable")
    return FileResponse(file_path)