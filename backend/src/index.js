import express from 'express';
import ROUTER from './routes/index.js';
import dotenv from 'dotenv';
import cors from 'cors';
const APP = express();
dotenv.config({ path: './src/.env' })

APP.use(cors())
APP.use(ROUTER);
APP.use(express.urlencoded({extended: true}))
APP.use(express.json())



const PORT = process.env.PORT || 1000;
APP.listen(PORT,()=>{
    console.log("###Server-> System is completely online");
    console.log("###Server -> Port "+PORT+ ' http://localhost:'+PORT);
});

//For test execution
export default APP