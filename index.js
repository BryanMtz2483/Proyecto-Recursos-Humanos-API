//Dependencias
const express = require('express');
const app = express();
const index = require('./middleware/index');



app.get('/', index);

app.listen(3000, ()=> {
    console.log("Server is running...");
});