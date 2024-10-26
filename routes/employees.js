const express = require('express');
const employees = express.Router();
const db = require('../config/database');
const e = require('express');

employees.post('/', async (req,res,nex) =>{
    const {name,last_name,phone,email,address} = req.body;

    if (name && last_name && phone && email && address){
        let query = "INSERT INTO employees(name,last_name,phone,email,address)";
        query += `VALUES('${name}','${last_name}',${phone},'${email}','${address}')`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Employee inserted Succesfully."});    
        }
        return res.status(500).json({code: 500, message: "An error occurred."}); 
    }
    return res.status(500).json({code: 500, message: "Incomplete fields"}); 
});

employees.delete('/:id([1-9]{1,3})', async (req,res,next) => {
    const query = `DELETE FROM employees WHERE id=${req.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Employee deleted successfully."});
    }
    return res.status(404).json({code: 404, message: "Employee not found"});
});

employees.put('/:id([1-9]{1,3})', async (req,res,next) => {
    const {name,last_name,phone,email,address} = req.body;

    if (name && last_name && phone && email && address){
        let query = `UPDATE employees SET name='${name}',last_name='${last_name}',phone=${phone},email='${email}',address='${address}'`;
        query+= `WHERE id=${req.params.id}`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Employee Updated Succesfully."});    
        }
        return res.status(500).json({code: 500, message: "An error occurred."});

    }
    return res.status(500).json({code: 500, message: "Incomplete fields"});
});

employees.get('/', async (req, res ,next) => {
    const emp = await db.query("SELECT * FROM employees");
    return res.status(200).json({code: 1, message: emp});
})

employees.get('/:id([1-9]{1,3})', async(req,res,next) => {
    const id = req.params.id;

    if (id >= 1 && id <= 10000){
        const emp = await db.query ("SELECT * FROM employees WHERE id="+id+";");
        return res.status(200).json({code: 200, message: emp});
    }
    return res.status(404).json({code: 404, message: "Employee not found"});
});

employees.get('/:name([A-Za-z]+)', async (req,res,next) => {
    const name = req.params.name;
    const emp = await db.query("SELECT * FROM employees WHERE name='"+name+"';");

    if(emp.length > 0){
        return res.status(200).json({code: 200, message: emp});
    }
    return res.status(404).json({code: 404, message: "Employee not found"});
});
module.exports = employees;