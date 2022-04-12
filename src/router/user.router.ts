import { UserConroller } from './../controller/user.conroller';
import { AllUsersController } from '../controller/allUsers.controller';
import { Router } from "express";



export const router = Router();
const userController = new UserConroller();
const allUsersController = new AllUsersController();


router.get('/', allUsersController.getAllUsers);
router.delete('/', allUsersController.deleteAllUser);
router.post('/user', userController.createUser);
router.get('/user/:id', userController.getOneUser);
router.delete('/user/:id', userController.deleteOneUser);
router.put('/user/:id', userController.updateUser);



