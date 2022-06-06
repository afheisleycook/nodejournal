const express = require("express");
const sqlite3 = require("sqlite3");
const path = require('path');
const { redirect } = require("express/lib/response");
let db = new sqlite3.Database("journal.db");
app = express();
let logged = false;
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
       if(logged == true) {
        let note = req.body;
        
        db.run("insert into NOTES(NOTES_TITLE,NOTES_DESCRIPTION,NOTES_TAG) values(?,?,?)",[note],function(err) {[]
        if(err) {
           console.log(err.message);
        } 
        console.log(note);
    });
       console.log("added" + note);
}
if(logged == "false") {
    redirect("journal/error");
}
        res.redirect("/journal");
        
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
app.post("/journal/login",function(req, res) {
    user = req.body;
    let result = db.all("select * from USERS where USER_NAME=? AND USER_PASSWORD",[name,pasword],(err)=>{
        if(err) {
            
            res.redirect("/journal/error");
        };
        if(result) 
        {
            logged=true;

        }
        res.redirect("/");
    });
});



app.listen(8083)
