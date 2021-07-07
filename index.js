const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = 8000;
const { urlencoded } = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "clientes"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.post("/api/insert", (req, res) => {
    const id = req.body.id;
    const text = req.body.text;
    const done = req.body.done;
    const sqlQuery = "INSERT INTO todo (id, text, done) VALUES (?, ?, ?)";
    db.query(sqlQuery, [id, text, done], (err, result) => {
        res.send('success!');
    });
})

/*
app.post("/api/insert", (req, res) => {
    const id = req.body.id
    const text = req.body.text
    const done = req.body.done
    const sqlQuery = "INSERT INTO todo (id, text, done) VALUES ('1', 'test', true)";
    db.query(sqlQuery, [id, text, done], (err, result) => {
        res.send('success!');
    });
})
*/

// done 부분 true는 "" 없이 전송해야 전송됨

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});