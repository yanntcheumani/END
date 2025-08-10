from fastapi import APIRouter
from api.v1.endpoints import auth

api_v1 = APIRouter(prefix="")
api_v1.include_router(auth.router, prefix="/auth", tags=["auth"])
