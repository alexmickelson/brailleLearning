from fastapi import FastAPI, APIRouter
from src.features import assignment_router

app = FastAPI()


router = APIRouter(prefix="/api")


@router.get("/")
async def root():
    return {"message": "Hello World"}


router.include_router(assignment_router.router)

app.include_router(router)
