/**
 * Emojo services for mattermost
 * Add some slashcommand pointing to the api tu use
 * 
 * in mattermost :
 * 		`/command [text]` -> [text] [emojo]
 */
var express = require('express')
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('database.sqlite');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

let port = 8000;
var addemojo_token = '';

/**
 * Init database and prepare the request
 */
db.run("CREATE TABLE IF NOT EXISTS emojo (name TEXT PRIMARY KEY, emojo TEXT)");

var get_emojo = db.prepare("SELECT emojo FROM emojo WHERE name = (?)");

/**
 * Emojo endpoint : return the emojo when summoned
 */
app.post('/api/emojo', function (req, res) {

	console.log("query ", req.body.command);

	if (req.body.command === undefined) {
		res.send({
			response_type: 'ephemeral',
			text: 'Undefined'
		});
		return;
	}

	get_emojo.all(req.body.command, function(err, row){
		if (row.length === 1){
			console.log(row);
			res.send({
				response_type: 'in_channel',
				text: req.body.text + " " + row[0].emojo
			});
		} else {
			res.send({
				response_type: 'ephemeral',
				text: 'Emojo not found'
			});
		}
	})
});

/**
 * Emojo add : add an emojo into the database
 */
app.post('/api/emojo/add', function(req, res) {
	// Need to check the server key
	if (req.body.token === addemojo_token) {
		let insert_emojo = db.prepare("INSERT OR IGNORE INTO emojo VALUES ((?), (?))");

		console.log("Adding " + req.body.command + " " + req.body.text);

		let arg = req.body.text.split(" ");

		if (arg.length  > 1) {
			insert_emojo.run("/" + arg[0], arg[1]);
			insert_emojo.finalize();

			res.send({
				response_type: 'ephemeral',
				text: 'Emojo inserted, add the corresponding slash command to enable it'
			});
		} else {
			res.send({
				response_type: 'ephemeral',
				text: 'Incorrect argument'
			});
		}
	} else {
		res.send({
			response_type: 'error',
			text: 'You do not have correct rigth for this'
		})
	}
});

app.get('/api/emojo/list', function(req, res) {
	let list_emojo = db.prepare("SELECT * FROM emojo");
	let textList = "command emojo\n";

	list_emojo.all(function(err, rows) {
		rows.forEach(function(row) {
			textList = textList + row.name + " " + row.emojo + "\n";
		});
		res.send({
			response_type: 'ephemeral',
			text: textList
		});
	});
});

app.listen(port);
console.log("Serveur listenting on port " + port);