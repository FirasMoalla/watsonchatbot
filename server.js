const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const ConversationV1 = require('watson-developer-cloud/conversation/v1');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const conversation = new ConversationV1({
  username: '',
  password: '',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});

// chatbot conversation context
var chatContext = null;

const processResponse = (req, res) => {
  const userText = req.body.input;

  conversation.message(
    {
      input: { text: userText },
      context : chatContext,
      workspace_id: ''
    },
    function(err, botResponse) {
      if (err) {
        console.error(err);
      } else {
        chatContext = botResponse.context;

        // Display the output from dialog, if any
        if (botResponse.output.text.length != 0) {
          console.log(botResponse.output.text[0]);
        }

        // If an intent was detected, log it out to the console
        if (botResponse.intents.length > 0) {
          console.log('Detected intent: #' + botResponse.intents[0].intent);
        }

        // Execute time action
        if (botResponse.output.action == 'display_time') {
          console.log(botResponse.output.action);
          return res.send(new Date().toLocaleTimeString());
        }

        return res.send(botResponse.output.text[0]);
      }
    }
  );
};

app.post("/api/message", processResponse);

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
