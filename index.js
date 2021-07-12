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

/* DB에서 todo 가지고 온다 */
app.get("/api/get", (req, res) => {
    const sqlQuery = "SELECT * FROM todo;"
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    })
})

/* 추가 */
app.post("/api/insert", (req, res) => {
    const id = req.body.id;
    const text = req.body.text;
    const done = req.body.done;
    const sqlQuery = "INSERT INTO todo (id, text, done) VALUES (?, ?, ?)";
    db.query(sqlQuery, [id, text, done], (err, result) => {
        console.log("err", result, err);
        res.json({ code:200, message: "추가되었습니다."});
    });
})

/* TOGGLE 수정 */
app.post("/api/update/:id", (req, res) => {
    const sqlQuery = "UPDATE todo SET done = !done WHERE id = ?";
    db.query(sqlQuery, [req.params.id], (err, result) => {
        console.log("err", result, err);
        res.json({ code: 200, message: "수정되었습니다." });
    });
})

/* 삭제 */
app.delete("/api/delete/:id", (req, res) => {
    const sqlQuery = "DELETE FROM todo WHERE id = ?";
    db.query(sqlQuery, [req.params.id], (err, result) => {
        console.log("err", result, err);
        res.json({ code:200, message: "삭제되었습니다."});
    });
})

// done 부분 true는 "" 없이 전송해야 전송됨

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});