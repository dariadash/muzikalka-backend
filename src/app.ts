const express = require('express')
import * as bodyParser from 'body-parser';
import {router as userRouter} from './Router';
const passport = require('passport')
import './dbconnection';
import './passport';

const app = express();
app.use(passport.initialize())
app.use(bodyParser.json())
app.use('/api', userRouter);
app.use("/api/files", express.static(__dirname + '/../uploads'))

app.listen(3500, ()=>{
    console.log('сервер запущен')
});