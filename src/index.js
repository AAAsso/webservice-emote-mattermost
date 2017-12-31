/**
 * Emojo services for mattermost
 * Add some slashcommand pointing to the api tu use
 * 
 * in mattermost :
 * 		`/command [text]` -> [text] [emojo]
 */
var express = require('express')
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let port = 8000;

/**
 * Emojo endpoint : return the emojo when summoned
 */
app.post('/api/emojo', function (req, res) {
	let response = {
		response_type: 'in_channel'
	};

	switch (req.body.command) {
		case '/shrug':
			response.text = req.body.text + " ¯\\_(ツ)_/¯";
			break;
		case '/deargod ':
			response.text = req.body.text + " щ（ﾟДﾟщ）";
			break;
		case '/seal':
			response.text = req.body.text + " ᶘ ᵒᴥᵒᶅ";
			break;
		case '/flip':
			response.text = req.body.text + " ╯‵Д′)╯彡┻━┻";
			break;
		default:
			response = {response_type: 'error', text: 'Command not found'};
	}

	res.send(response);
})

/**
 * TODO :
 * add a /api/emojo/add endpoint storing emojo in database
 */

app.listen(port);
console.log("Serveur listenting on port " + port);