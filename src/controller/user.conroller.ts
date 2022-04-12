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
               res.status(404).send(`Error: ID "${req.params.id}" does not exist`)
           }
           else{
               return res.json(user);
           }
            

    }

    async deleteOneUser(req: Request, res: Response) {
        const user = await AppDataSource            
            .createQueryBuilder()
            .delete()
            .from(User)
            .where('id = :id', {id: req.params.id})
            .execute()  
            .catch((er) => {
                res.send(er);
            })       
           
        return res.send('User has been deleted!')
    }

    async updateUser(req: Request, res: Response) {
        const { name, email } = req.body;

        if( name == '' || email == ''){
            res.status(400).send('Error: All fields must be filled')
        }
        else{
            const user = await AppDataSource            
            .createQueryBuilder()
            .update(User)            
            .set(
                { userName: name, email: email }
             )
            .where('id = :id', {id: req.params.id})
            .execute()  
            .catch((er) => {
                res.send(er);
            }) 
            return res.send('User has been updated!')
        }             
           
        
    }
}