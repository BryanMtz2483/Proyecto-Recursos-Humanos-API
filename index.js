//Dependencias
const express = require('express');
const app = express();
const morgan = require('morgan');
//Routes
const employees = require('./routes/employees');
//Middlewares
const index = require('./middleware/index');
const user = require('./routes/user');
const auth = require('./middleware/auth');
const cors = require('./middleware/cors');
const notFound = require('./middleware/notFound');

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.get('/', index);
app.use('/user',user);
app.use("/employees",auth,employees);
app.use(notFound);

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Server is running...");
});