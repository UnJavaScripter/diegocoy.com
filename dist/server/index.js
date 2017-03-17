var express = require("express");
var path = require("path");
var ejs = require("ejs");
var Server = (function () {
    //public app: express.Application;
    function Server() {
        var app = express();
        app.engine(".html", require("ejs").__express);
        app.use(express.static(path.join(__dirname, "../client")));
        app.set("views", path.join(__dirname, "views"));
        app.set("view engine", "html");
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.get("/", function (req, res) {
            res.render("main", { config: { email: 'hola@diegocoycom' } });
        });
        app.get("/talks", function (req, res) {
            res.render("talks", { talks: require('./talks.json') });
        });
        app.get("/hire-me", function (req, res) {
            res.render("hire-me");
        });
        app.listen(3000, function (_) { return console.log("API running on port 3000"); });
    }
    return Server;
}());
var theServer = new Server();
