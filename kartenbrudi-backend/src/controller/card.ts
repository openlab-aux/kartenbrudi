import { Request, Response } from 'express';
import { FileCardRepository } from '../repository/card';

import Card from '../model/card';

const repo = new FileCardRepository()

export default class CardController {
    static async listCards(req: Request, res: Response) {
        const result = repo.getCards()
        if (result.isErr()) {
            res.status(500);
        }
        res.json(
            result.unwrapOr({ "err": "500" })
        )
    }

    static async provisionCard(req: Request, res: Response) {
        const result = repo.saveCard(req.body as Card)
        if (result.isErr()) {
            res.status(500)
            res.send({ "err": "500" })
            return
        }

        res.status(201)
        res.send()
    }

    static async deleteCard(req: Request, res: Response) {
        const result = repo.deleteCard(req.params['id'])
        if (result.isErr()) {
            res.status(500)
            res.send(result.error)
            return
        }

        res.status(201)
        res.send()
    }
}