FROM node:18-alpine

WORKDIR /usr/src/app

RUN set -ex; \
    apk add git g++ gcc libgcc libstdc++ linux-headers make python3;

RUN set -ex; \
    wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -;\
    source /root/.shrc;

COPY . .

RUN git submodule update --init --recursive; \
    rm -rf /usr/src/.git /usr/src/packages/backend/src /usr/src/packages/backend/.env.production; \
    /root/.local/share/pnpm/pnpm install;

#/root/.local/share/pnpm/pnpm
