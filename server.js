var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var ConversationV1 = require('watson-developer-cloud/conversation/v1');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var conversation = new ConversationV1({
  username: '',
  password: '',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});

app.post("/api/message", function (request, res) {
  var userText = request.body.input;

  conversation.message(
    {
      input: { text: userText },
      workspace_id: ''
    },
    function(err, response) {
      if (err) {
        console.error(err);
      } else {
        console.log(JSON.stringify(response, null, 2));
        var resj = JSON.stringify(response, null, 2);
        return res.send(resj);
      }
    }
  );
});

//serve static file (index.html, js, images, css)
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
