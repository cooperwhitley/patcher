const express = require('express');
const path = require('path');
require('dotenv').config();
require('./utils/connection');
const middleware = require('./utils/middleware.js');

// declare routers via controllers
const authRouter = require('./controllers/authControllers')
const postRouter = require('./controllers/postControllers')
const profileRouter = require('./controllers/profileControllers')


const app = express();


// view engine

app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `ejs`);

middleware(app);

// routes
app.get('/', (req, res) => {
    res.render('index', {title: 'patcher'})
})
app.use('/', authRouter)
app.use('/posts/', postRouter)
app.use('/profiles/', profileRouter)

// server listener
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app is ready to go`)
})