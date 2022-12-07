import express from "express"
import cors from 'cors';

import { AppDataSource } from './data-source'
import routes from "./routes";




AppDataSource.initialize().then(()=>{
    
    const app = express();

    app.use(cors());

    app.use(express.json());

    app.use(routes);
        
    app.listen(3333, ()=> console.log("Server Start"));

})

