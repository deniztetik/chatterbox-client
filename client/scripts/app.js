// YOUR CODE HERE:
// YOU DO NOT NEED TO EDIT this code. But do take the time to understand what it's doing.
  // console.log("hi");

  //


var app = {messages: [], room: [], template: undefined};

app.init = function() {
  app.template = $(".template").clone();
  $(".template").hide();
  app.fetch();
  refreshMessages();
  submitMessage();
  roomFilter();
  // app.displayMessages();

};

app.send = function(message) {
  $.ajax('https://api.parse.com/1/classes/chatterbox', {
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(message),
    success: function() { console.log("success") },
    error: function() { console.log("error") }
  });
};

app.fetch = function() {
  $.get('https://api.parse.com/1/classes/chatterbox').then(
    function(data) {
      app.messages = data.results;
      app.displayMessages();
    }, function() {
      console.log("fetch failed!");
  });
};

app.clearMessages = function() {
  app.messages = [];
  $("#chats").empty();
};

app.displayMessages = function() {
  app.messages.forEach(function(item) {
    var $message = app.template.clone();
    $message.find(".username").text(item.username);
    $message.find(".message").text(item.text);
    $message.addClass($("#roomSelector").val());
    $("#chats").append($message);
  });
};

app.addMessage = function(text) {
  var message = {
    username: document.location.search.slice(10).split("%20").join(" "),
    text: text,
    roomname: $("#roomSelector").val()
  }
  var $message = app.template.clone();
  $message.find(".username").text(message.username);
  $message.find(".message").text(text);
  $("#chats").prepend($message);
  app.send(message);
};

app.addRoom = function() {};


app.addFriend = function() {};

app.handleSubmit = function() {};

app.changeRoom = function(room) {
  $("#chats").filter(function() {
   return $(this).attr("class")!== room})
  }).hide();
}


$(document).ready(app.init);
