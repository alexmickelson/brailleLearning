from fastapi import FastAPI, APIRouter

app = FastAPI()


router = APIRouter(prefix="/api")


@router.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(router)
