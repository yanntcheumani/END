from fastapi import APIRouter
from api.v1.endpoints import auth, blog, tag

api_v1 = APIRouter()
api_v1.include_router(auth.router, prefix="/auth", tags=["auth"])
api_v1.include_router(blog.router, prefix="/blog", tags=["blog"])
api_v1.include_router(tag.router, prefix="/tag", tags=["tag"])
