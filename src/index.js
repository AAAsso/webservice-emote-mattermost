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

/**
 * Emojo endpoint : return the emojo when summoned
 */
app.post('/api/emojo', function (req, res) {
	let response = {
		response_type: 'in_channel'
	};
	if (req.body.command === '/shrug') {
			response.text = req.body.text + " ¯\\_(ツ)_/¯";
	} if (req.body.command === '/dearGod') {
		response.text = req.body.text + " щ（ﾟДﾟщ）";	
	} if (req.body.command === '/seal') {
		response.text = req.body.text + " ᶘ ᵒᴥᵒᶅ";	
	} if (req.body.command === '/flip') {
		response.text = req.body.text + " ╯‵Д′)╯彡┻━┻";
	} else {
		response = {
			response_type: 'error',
			text: 'Command not found'
		};
	}
	res.send(response);
})

/**
 * TODO :
 * add a /api/emojo/add endpoint storing emojo in database
 */

app.listen(8000);