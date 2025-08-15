from typing import Optional
from pydantic import BaseModel, ConfigDict
from fastapi import File, UploadFile


class BlogCreate(BaseModel):
    title: str
    description: str
    read_time: int
    uuid_author: str

    video_url: Optional[str]
    video_file: Optional[UploadFile]
    picture_preview_url: Optional[str]
    picture_preview_file: Optional[UploadFile]

class BlogOut(BaseModel):

    title: str
    description: str
    read_time: int
    uuid_author: str
    video_url: Optional[str]
    picture_preview_url: Optional[str]
    
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


