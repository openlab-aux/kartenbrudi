import Card from "../model/card";
import Error from "../util/error";
import config from "config";
import fs from 'fs';
import { Result, ok, err } from 'neverthrow';

export interface ICardRepository {
    getCards(): Result<Card[], Error>;
    saveCard(card: Card): Result<null, Error>;
    deleteCard(id: string): Result<null, Error>;
}

const path: string = config.get("storage.path")

export class FileCardRepository implements ICardRepository {
    getCard(id: string): Result<Card, Error> {
        try {
            const reference = fs.readFileSync(`${path}/${id}`).toString()
            return ok({
                id,
                reference
            })
        } catch(e) {
            return err({msg: "error reading card", exception: e});
        }
    }

    getCards(): Result<Card[], Error> {
        try {
            const filenames = fs.readdirSync(path)
            return ok(filenames.map((filename) => {
                return {
                    id: filename,
                    reference: fs.readFileSync(`${path}/${filename}`).toString()
                }
            }));
        } catch(e) {
            return err({ "msg": "error loading cards", exception: e })
        }
    }

    saveCard(card: Card): Result<null, Error> {
        try {
            fs.writeFileSync(`${path}/${card.id}`, card.reference)
            return ok(null)

        } catch(e) {
            return err({ "msg": "error saving card" , exception: e})
        }
    }

    deleteCard(id: string): Result<null, Error> {
        const result = this.getCard(id)
        if(result.isErr()) {
            return err(result.error)
        }

        const card = result.value

        try {
            fs.rmSync(`${path}/${card.id}`)
            return ok(null)
        } catch(e) {
            return err({ "msg": "error deleting card", exception: e })
        }
    }
}