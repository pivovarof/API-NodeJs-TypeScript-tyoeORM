import { error } from "console";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user";

export class UserConroller {

    async createUser(req: Request, res: Response) {
        const { name, email } = req.body;

        await AppDataSource.getRepository(User)
            .createQueryBuilder('createUser')
            .insert()
            .into(User)
            .values([{
                userName: name,
                email: email
            }])
            .execute()

        res.send('User saved!')

    }

    async getAllUsers(req: Request, res: Response) {
        const allUsers = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("allUsers")
            .getMany()
            .catch((er) => {
                res.send(er);
            })
        res.json(allUsers);

    }

    async getOneUser(req: Request, res: Response) {
        const user = await AppDataSource
            .getRepository(User)
            .createQueryBuilder('user')
            .where( 'user.id = :id', { id: req.params.id})
            .getOne()  
            .catch((er) => {
                res.send(er);
            })       
           
           if( user == null){
               res.status(404).send(`Invalid id:${req.params.id}`)
           }
           else{
               return res.json(user);
           }
            

    }
}