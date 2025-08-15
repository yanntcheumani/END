from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict
from crud.role import EnumRole

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    username: str
    name: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    username: str
    role: list[EnumRole]

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
