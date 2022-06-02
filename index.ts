const express = require0("express");
let app = express();
app.all("/",function(res,req) {
 res.send("hello");
});