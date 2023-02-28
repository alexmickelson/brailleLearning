from fastapi import FastAPI, APIRouter
from src.features.assignment import assignment_router
from src.features.users import users_admin_router
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()


router = APIRouter(prefix="/api")


@router.get("/")
async def root():
    return {"message": "Hello World"}


router.include_router(assignment_router.router)
router.include_router(users_admin_router.router)

app.include_router(router)
