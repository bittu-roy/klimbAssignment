const express= require('express');
const cors = require('cors');
const mongoose= require('mongoose');

require('dotenv').config();

const app= express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const userRoute= require('./routes/user.routes.js');
app.use('/', userRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})