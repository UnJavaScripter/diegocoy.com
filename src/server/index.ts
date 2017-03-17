const express =  require("express");
const path =  require("path");
const ejs = require("ejs");

class Server {

  //public app: express.Application;

  constructor() {
    const app = express();

    app.engine(".html", require("ejs").__express);
    app.use(express.static(path.join(__dirname, "../client")));
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "html");

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.get("/", (req, res) => {
      res.render("main", {config: {email: 'hola@diegocoy.com'}});
    });
    
    app.get("/talks", (req, res) => {
      res.render("talks", {talks: require('./talks.json')});
    });
    
    app.get("/hire-me", (req, res) => {
      res.render("hire-me");
    });

    app.listen(3000, _ => console.log("API running on port 3000"));
  }
  
}


const theServer = new Server();
