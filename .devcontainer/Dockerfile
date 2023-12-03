FROM python:bullseye

RUN apt update \
  && apt install -y \
    nodejs \
    npm \
    git \
    cargo \
  && npm install -g n \
  && n 18 \
  && apt-get clean


RUN groupadd --gid 1000 developer \
  && useradd --uid 1000 --gid 1000 -s /bin/bash -m developer \
  && chown developer:developer /home/developer

WORKDIR /app
