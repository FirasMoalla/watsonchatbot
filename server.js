var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var ConversationV1 = require('watson-developer-cloud/conversation/v1');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/* Initiate Conversation Instance */
var conversation = new ConversationV1({
  username: '3b9b6a06-cc97-4acf-af8b-22b09506e14e',
  password: 'K1VhgNBxnjR5',
//  url: 'https://gateway.watsonplatform.net/conversation/api/v1/workspaces/51f4ac96-577b-438d-bf00-1370a21bb711/message/',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});


/* Endpoint to greet and add a new visitor to database.
* Send a POST request to localhost:3000/api/visitors with body
* {
* 	"name": "Bob"
* }
*/
app.post("/api/message", function (request, res) {
  var userText = request.body.userInput;

  conversation.message(
    {
      input: { text: 'hi' },
      workspace_id: '51f4ac96-577b-438d-bf00-1370a21bb711'
    },
    function(err, response) {
      if (err) {
        console.error(err);
      } else {
        console.log(JSON.stringify(response, null, 2));
        var resj = JSON.stringify(response, null, 2);
        return res.send(resj);
//        return response.json(JSON.stringify(response, null, 2));
      }
    }
  );

//  response.send("Hello " + userName + "! I added you to the database.");
});

/*
  conversation.message(
    {
      input: { text: 'hi' },
      workspace_id: '51f4ac96-577b-438d-bf00-1370a21bb711'
    },
    function(err, response) {
      if (err) {
        console.error(err);
      } else {
        console.log(JSON.stringify(response, null, 2));
//        response.send(JSON.stringify(response, null, 2));
      }
    }
  );
*/


//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
