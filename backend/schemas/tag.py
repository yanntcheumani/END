from pydantic import BaseModel, Field, field_validator, ConfigDict
from typing import Optional, List

class TagBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255, description="nom du tag")


class TagCreate(TagBase):

    @field_validator('name')
    def validate_name(cls, v):
        return v.strip()


class TagOut(TagBase):
    # reference: str = Field(..., alias="uuid", min_length=1, max_length=255, description="uuid du tag")


    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
