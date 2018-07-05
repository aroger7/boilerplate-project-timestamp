// server.js
// where your node app starts

// init project
var express = require("express");
var dotEnv = require("dotenv");
var app = express();

dotEnv.load(".env");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
	res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:date_string?", function(req, res) {
	let date, ms, ret, dateString;
	dateString = req.params.date_string;
	if (dateString) {
		ms = Number(dateString);
		date = ms && Number.isInteger(ms) ? new Date(ms) : new Date(dateString);
		if (!isNaN(date.getTime())) {
			ret = { unix: date.getTime(), utc: date.toUTCString() };
		} else {
			console.log("error: invalid date");
			ret = { error: "Invalid Date" };
		}
	} else {
		date = new Date();
		ret = { unix: date.getTime(), utc: date.toUTCString() };
	}

	console.log("returning timestamp", ret);
	res.json(ret);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
	console.log("Your app is listening on port " + listener.address().port);
});
