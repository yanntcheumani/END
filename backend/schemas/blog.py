from typing import Optional
from pydantic import BaseModel, ConfigDict, field_validator
from fastapi import UploadFile
from typing import List


class BlogBase(BaseModel):
    title: str
    description: str
    read_time: int
    text: str
    tags: List[str]

class BlogOut(BlogBase):
    video_url: Optional[str]
    picture_preview_url: Optional[str]
    author_name: str 

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

class BlogFile(BaseModel):
    pathname: Optional[str] = ""
    content: bytes | None = None
    file: UploadFile | None = None

class BlogCreate(BlogBase):
    picture_preview_file: UploadFile | None = None
    video_file: UploadFile | None = None


    @field_validator('title')
    def validate_name(cls, v):
        return v.strip()

    @field_validator('description')
    def validate_name(cls, v):
        return v.strip()
