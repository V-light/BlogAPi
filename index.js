const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const  postsRoute = require('./routes/posts');
const categoriesRoute = require('./routes/categories');

app.use(express.json());
dotenv.config();


mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log('database has connected'))
    .catch(err=>console.log(err))

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/categories', categoriesRoute);

app.listen(3000, ()=>{
    console.log("server has started...!!");
})