const express = require('express');
const user = express.Router();
const jwt = require('jsonwebtoken');
const db = require ('../config/database');

user.post('/signin', async(req,res,next) => {
    const {user_name,user_mail,user_password} = req.body;
    if (user_name && user_mail && user_password){
        let query = "INSERT INTO users(user_name, user_mail, user_password) ";
        query+= `VALUES ('${user_name}', '${user_mail}', '${user_password}')`;
    
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "User inserted successfully"});
        }
        return res.status(500).json({code: 500, message: "An error ocurred"});
    }
    return res.status(500).json({code: 500, message: "Incomplete Fields"});
});//INSERTAR USUARIOS

user.post('/login', async (req,res,nex) =>{
    const{user_mail, user_password} = req.body;
    const query = `SELECT * FROM users WHERE user_mail='${user_mail}' AND user_password='${user_password}';`; 
    const rows = await db.query(query);

    if(user_mail && user_password){
        if(rows.length == 1){
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail:rows[0].user_mail 
            }, "debugkey");
            return res.status(200).json({code: 200, message: token});
        }else{
            return res.status(401).json({code: 401, message: "User or Password Incorrect"});
        }
    }
    return res.status(401).json({code: 401, message: "Incomplete Fields"});
});

user.get('/', async(req,res,next) =>{
    const query = "SELECT * FROM users";
    const rows = await db.query(query);

    return res.status(200).json({code: 200, message: rows});
});//VER LOS USUARIOS
module.exports = user;