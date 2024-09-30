FROM bardakdev/rifify-backend:source

WORKDIR /usr/src/app/packages/backend

RUN [ "rm", "-rf", "src" ]

COPY packages/backend/src ./src
COPY packages/backend/.env.production ./.env
COPY packages/backend/tsconfig.json ./tsconfig.json
COPY packages/backend/vite.config.ts ./vite.config.ts

CMD [ "npm", "run", "dev" ]

#docker buildx build --platform linux/amd64 -t bardakdev/elysium-backend . --no-cache --push
