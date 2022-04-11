import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from "../entity/user";


export class AllUsersController {

    async getAllUsers(req: Request, res: Response) {
        const allUsers = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .getMany()
            .catch((er) => {
                res.send(er);
            })
        res.json(allUsers);

    }

    async deleteAllUser(req: Request, res: Response) {
        const user = await AppDataSource
            .getRepository(User)
            .createQueryBuilder()
            .select('*')
            .delete()
            .execute()
            .catch((er) => {
                res.send(er);
            })

        return res.send('All Users have been deleted!')
    }
}
