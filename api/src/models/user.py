from typing import Optional
from pydantic import BaseModel


class User(BaseModel):
    sub: str
    name: str
