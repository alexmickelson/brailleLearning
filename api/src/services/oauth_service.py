import json
from pprint import pprint
from typing import Optional
import jwt
import os
from jwt.algorithms import RSAAlgorithm
import requests
from fastapi import Request, HTTPException, Depends
from jwt import PyJWKClient
from jwt import PyJWK
from src.features.users.user_service import UserService

from src.models.user import User

audience = None
signing_key: PyJWK | None = None


async def authenticate_user(request: Request, user_service: UserService = Depends()):
    user = await __get_user_from_request(request)
    profile = await user_service.get_profile(user.sub, user.name)
    return profile


async def authorize_admin(request: Request, user_service: UserService = Depends()):
    profile = await authenticate_user(request, user_service)
    if profile.is_admin:
        return profile
    raise HTTPException(status_code=403, detail={"detail": "unauthorized"})


def __set_audience_and_key(token: str):
    global audience
    global signing_key
    audience = os.environ["AUTH_AUDIENCE"]
    jwks_url = os.environ["JWKS_URL"]
    jwks_client = PyJWKClient(jwks_url)
    signing_key = jwks_client.get_signing_key_from_jwt(token)


def __get_user(token: str):
    global audience
    global signing_key
    if not audience or not signing_key:
        __set_audience_and_key(token)
    if not audience or not signing_key:
        raise Exception("could not get key to validate jwt")

    raw_user = jwt.decode(
        token,
        audience=audience,
        key=signing_key.key,
        algorithms=["RS256"],
        verify=False,
    )
    user = User(
        sub=raw_user["sub"],
        name=raw_user["name"],
    )
    return user


async def __get_user_from_request(request: Request):
    if "Authorization" in request.headers:
        auth_header = request.headers["Authorization"]
        token = auth_header.split(" ")[1]
        user = __get_user(token)
        return user

    if "Cookie" in request.headers:
        cookie_list = request.headers["Cookie"].split("; ")
        for cookie in cookie_list:
            if "jwt=" in cookie:
                jwt = cookie.replace("jwt=", "")
                user = __get_user(jwt)
                return user

    raise HTTPException(status_code=403, detail="Authorization Token Not Found")
