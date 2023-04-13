import { Router, Request, Response } from 'express';
import { FileCardRepository } from '../repository/card';
import CardController from '../controller/card';

export const cardRouter = Router()

cardRouter.get("/", CardController.listCards)
cardRouter.post("/", CardController.provisionCard)
cardRouter.delete("/:id", CardController.deleteCard)