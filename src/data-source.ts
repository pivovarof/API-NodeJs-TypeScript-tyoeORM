import {DataSource} from 'typeorm';
import { User } from './entity/user.js';


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1122334455",
    database: "test_database",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
    
})