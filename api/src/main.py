import logging
from pprint import pprint
from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from src.features.assignment import assignment_router, assignment_admin_router
from src.features.submissions import submission_router
from src.features.users import user_router, users_admin_router
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request, exception: RequestValidationError
):
    logger.error(f"Validation Error with: {request.method} {request.url} {exception}")
    content = jsonable_encoder({"detail": exception.errors(), "body": exception.body})
    return JSONResponse(status_code=422, content=content)


router = APIRouter(prefix="/api")


@router.get("/")
async def root():
    return {"message": "Hello World"}


router.include_router(assignment_router.router)
router.include_router(assignment_admin_router.router)
router.include_router(users_admin_router.router)
router.include_router(user_router.router)
router.include_router(submission_router.router)

app.include_router(router)
