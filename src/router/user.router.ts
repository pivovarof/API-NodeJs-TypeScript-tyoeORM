import { UserConroller } from './../controller/user.conroller';
import { Router } from "express";
import { AppDataSource } from '../data-source';
import { User } from '../entity/user';


export const router = Router();
const userController = new UserConroller();



router.post('/user', userController.createUser);
router.get('/user/:id', userController.getOneUser);
router.get('/users', userController.getAllUsers);


