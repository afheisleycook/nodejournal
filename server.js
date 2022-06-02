const express = require("express");
const sqlite3 = require("sqlite3");
const path = require('path');
let db = new sqlite3.Database("journal.db");
app = express();
app.all("/journal", function(req, res) {
    res.sendFile(path.join(__dirname+ "//index.html"));
});
app.get("/journal/search/:title:", function(req, res) {
    let title = req.params.title;
    let result = db.exec("select * from NOTES");

    res.sendFile(path.join(__dirname+ "//index.html"));
});
app.all("/", function(req, res) {
    res.redirect("/journal");
});
app.get("/journal/addform", function(req, res) {
    res.sendFile(path.join(__dirname+ "//form.html"));
});
app.post("/journal/add", function(req, res) {
    try {
        let title = req.body['title'];
        let description = req.body['description'];
        let tags = req.body['tags'];
        db.all("insert into POSTS values('" + title + ",'" + description + "','" + tags + "')");
        res.redirect("/journal");
    } catch(Error) {

        res.redirect("/error",Error);
    }

});
app.get("/journal/details",function(req,res ) {
    res.sendFile(__dirname + "//about.html");
});
app.get("/journal/api/", function(req, res) {
    let result = db.all("select * from NOTES",[],(err,rows)=>{
        res.send(rows);
});

    
});
app.get("/journal/error", function(req, res) {
    es.sendFile(path.join(__dirname+ "//error.html"));
});



app.listen(8083)
