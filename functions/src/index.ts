import * as functions from "firebase-functions"
import * as path from "path"
import * as ejs from "ejs"
import compression = require("compression")
import express = require("express")

const app = express()

// Define the views directory (for the Server Side Rendering)
app.set("views", path.join(__dirname, "../views"))
// Set the view engine for the Server Side Rendering
app.set("view engine", "html")
app.engine("html", ejs.renderFile)

// Define the location of the public folder for the static assets
app.use(express.static(path.join(__dirname, "../../public")))

// Set headers for all requests
app.use((req, res, next) => {
	res.set("Cache-Control", "public, max-age=300, s-maxage=600")
	res.set(
		"Strict-Transport-Security",
		"max-age=31536000; includeSubDomains; preload"
	)
	next()
})

// Use gzip to compress the assets
app.use(compression())

app.get("/", (req, res) => {
	res.render("index")
})

app.get("/contact", (req, res) => {
	res.render("contact")
})

if (process.env.DEV === "true") {
	app.listen(8088, () => {
		console.log("8088: Listening")
	})
}

export const main = functions.https.onRequest(app)
