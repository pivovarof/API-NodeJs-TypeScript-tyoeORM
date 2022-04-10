import { UserConroller } from './../controller/user.conroller';
import { Router } from "express";
import { AppDataSource } from '../data-source';
import { User } from '../entity/user';


export const router = Router();
const userController = new UserConroller();



router.post('/user', userController.createUser);
router.get('/user/:userName', userController.getOneUser);
router.get('/user/users', userController.getAllUsers);
router.delete('/user/:userName', userController.deleteOneUser);
router.put('/user/:userName', userController.updateUser);



