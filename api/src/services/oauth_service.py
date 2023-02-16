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

from src.models.user import User

audience = None
signing_key: PyJWK | None = None


def __set_audience_and_key(token: str):
    global audience
    global signing_key
    audience = os.environ["AUTH_AUDIENCE"]
    jwks_url = os.environ["JWKS_URL"]
    jwks_client = PyJWKClient(jwks_url)
    signing_key = jwks_client.get_signing_key_from_jwt(token)


def get_user(token: str):
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
    # pprint(raw_user)
    if "email" in raw_user.keys():
        user = User(
            email=raw_user["email"],
            token=token,
        )
        return user
    else:
        return User(
            token=token,
            email=None
        )


async def authenticate_user(request: Request):
    if "Authorization" in request.headers:
        auth_header = request.headers["Authorization"]
        token = auth_header.split(" ")[1]
        user = get_user(token)
        request.state.user = user
        return user

    if "Cookie" in request.headers:
        cookie_list = request.headers["Cookie"].split("; ")
        for cookie in cookie_list:
            if "jwt=" in cookie:
                jwt = cookie.replace("jwt=", "")
                user = get_user(jwt)
                request.state.user = user
                return user

    raise HTTPException(status_code=403, detail="Authorization Token Not Found")
