ARG NODE_IMAGE=node:20.9.0-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
COPY --chown=node:node . .

FROM dependencies AS build
RUN node ace build

FROM base AS development
ENV PORT=$PORT
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./


EXPOSE $PORT
# CMD "/home/node/app/entrypoint.sh"