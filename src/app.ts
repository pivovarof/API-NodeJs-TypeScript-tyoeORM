
import express from 'express';
import "reflect-metadata";
import { AppDataSource } from './data-source';
import { router } from './router/user.router';



const app = express();
const port = process.env.PORT || 8000;
const userRouter = router;

app.use(express.json());

const main = async () => {
    try{
        await AppDataSource.initialize()
        .then(() => {
            console.log('Connected to database');
        })
        
        app.use('/', userRouter);

        app.listen(port, () => {
            console.log(`Server started on localhost:${port}`);
        
        })
    }
    catch(e){
        console.error(e);
        throw new Error('Unable to connect to db');
    }
}

main();





