FROM node:18 as builder

WORKDIR /src
COPY ./ ./
RUN npm install --include=dev
RUN npm run build
RUN npm pack

FROM node:18

WORKDIR /app
COPY ./config ./config
COPY --from=builder /src/kartenbrudi-backend-*.*.*.tgz /app/
RUN npm install *.tgz

CMD [ "npm", "run", "start" ]