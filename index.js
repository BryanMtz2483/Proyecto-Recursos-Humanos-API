//Dependencias
const express = require('express');
const app = express();
const morgan = require('morgan');
//Routes
const employees = require('./routes/employees');
//Middlewares
const index = require('./middleware/index');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.get('/', index);

app.use("/employees",employees);

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Server is running...");
});