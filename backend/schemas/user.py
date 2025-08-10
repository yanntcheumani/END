from typing import Optional
from pydantic import BaseModel, EmailStr
from crud.role import EnumRole

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    username: str
    role: Optional[list[EnumRole]] = [EnumRole.USER] 

class UserOut(BaseModel):
    id: int
    email: EmailStr
    username: str
    role: list[EnumRole]

    class Config:
        orm_mode = True