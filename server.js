const express = require("express");
const sqlite3 = require("sqlite3");
const path = require('path');
let db = new sqlite3.Database("journal.db");
app = express();
app.all("/journal", function(req, res) {
    res.sendFile(path.join(__dirname+ "//index.html"));
});

app.get("/journal/search/", function(req, res) {
    let title = req.params.title;
    let result = db.all("select * from NOTES where NOTES_TITLE=" + title + "",[],(err,rows)=>{
	res.json(rows);
    res.sendFile(path.join(__dirname+ "//results.html"));
    });
    
});
app.all("/", function(req, res) {
    res.redirect("/journal");
});
app.get("/journal/addform", function(req, res) {
    res.sendFile(path.join(__dirname+ "//form.html"));
});
app.post("/journal/add", function(req, res) {
        let note = req.body;
        console.table(note);
        /*
        db.all("insert into POSTS values('" + note + ",'" +  + "','" + note[2] + "')");
        res.redirect("/journal");
        */
});
app.get("/journal/details",function(req,res ) {
    res.sendFile(__dirname + "//about.html");
});
app.get("/journal/api/", function(req, res) {
    let result = db.all("select * from NOTES",[],(err,rows)=>{
        res.json(rows);
});

    
});
app.get("/journal/error", function(req, res) {
    res.sendFile(path.join(__dirname+ "//error.html"));
});



app.listen(8083)
