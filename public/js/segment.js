function buildUserSegment(userInput){
  var segment = '<div class="segments load">'
              +   '<div class="from-user top">'
              +     '<div class="summary">'
              +       '&nbsp;'
              +     '</div>'
              +     '<div class="message-inner">'
              +       '<p>' + userInput + '</p>'
              +     '</div>'
              +   '</div>'
              + '</div>';

    $('#scrollingChat').append(segment);
    scrollToChatBottom();
}

function buildWatsonSegment(userInput){
  var segment = '<div class="segments load">'
              +   '<div class="from-watson latest top">'
              +     '<div class="summary">'
              +       '&nbsp;'
              +     '</div>'
              +     '<div class="message-inner">'
              +       '<p>' + userInput + '</p>'
              +     '</div>'
              +   '</div>'
              + '</div>';

    $('#scrollingChat').append(segment);
    scrollToChatBottom();
}

function userInputEvent(event,inputBox){
  // Submit on enter key, dis-allowing blank messages
  if (event.keyCode === 13 && inputBox.value) {
    console.log("Detected");
    var userInput = $('#textInputOne').val();
    console.log(userInput);
    buildUserSegment(userInput);
    $('#textInputOne').val('');
    aCall(userInput);
  }
}

function aCall(userInput){
  if(userInput){
    // Built http request
    var http = new XMLHttpRequest();
    http.open('POST', '/api/message', true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200 && http.responseText) {
        var watsonResponse = http.responseText;
        console.log('response: ' + watsonResponse);
        buildWatsonSegment(watsonResponse);
      }
    };
    http.send(JSON.stringify({input: userInput}));
  }                                  
}

function scrollToChatBottom() {
  var elem = document.getElementById('scrollingChat');
  elem.scrollTop = elem.scrollHeight;
}
