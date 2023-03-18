from typing import Optional
from pydantic import BaseModel, Field, validator


class User(BaseModel):
    sub: str
    name: str


class UserProfile(BaseModel):
    sub: str
    name: str
    is_admin: bool

    @validator("is_admin", pre=True)
    def check_is_admin(cls, value):
        if value:
            return value
        return False
