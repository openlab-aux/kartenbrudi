import config from 'config';
import express, { Express } from 'express';
import cors from 'cors';

import { cardRouter } from './routers/card';
import bodyParser from 'body-parser';

const app: Express = express();

const port = config.get("networking.port")

app.use(cors())
app.use(bodyParser.json())

app.use('/card', cardRouter)

app.listen(`${port}`, () => {
  console.log(`kartenbrudi-backend is now listening on ${port}.`)
  console.log(`kartenbrudi-backend is using the data directory ${config.get("storage.path")}.`)
})