// YOUR CODE HERE:
// YOU DO NOT NEED TO EDIT this code. But do take the time to understand what it's doing.
  // console.log("hi");

  //


var app = {messages: [], rooms: {}, friends: {}, template: undefined};

app.init = function() {
  app.template = $(".template").clone();
  $(".template").hide();
  app.fetch();
  refreshMessages();
  submitMessage();
  app.changeRoom("Newroom")
  roomFilter();
};

app.send = function(message) {
  console.log(message);
  $.ajax('https://api.parse.com/1/classes/chatterbox', {
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(message),
    success: function(data) { console.log(data) },
    error: function() { console.log("error") }
  });
};

app.fetch = function() {
  var temp = $("#roomSelector").val();
  $.ajax('https://api.parse.com/1/classes/chatterbox', {
    type: "GET",
    data: { order: "-createdAt" },
    success: function(data) {
      app.messages = data.results;
      app.displayMessages();
      app.populateRooms();
      app.changeRoom(temp);
      $("#roomSelector").val(temp);
      friendListener();
    },
    error: function() { console.log("error") }
  });
}

app.clearMessages = function() {
  app.messages = [];
  $("#chats").empty();
};

app.displayMessages = function() {
  app.messages.forEach(function(item) {
    var $message = app.template.clone();
    $message.find(".username").text(item.username);
    $message.find(".message").text(item.text);
    $message.addClass(item.roomname);
    $("#chats").append($message);
    if (app.friends[item.username]) {
      $message.css("font-weight", "bold");
    }
  });
};

app.addMessage = function(text, room) {
  room = room || $("#roomSelector").val();
  var message = {
    username: document.location.search.slice(10).split("%20").join(" "),
    text: text,
    roomname: room
  }
  var $message = app.template.clone();
  $message.find(".username").text(message.username);
  $message.find(".message").text(text);
  $("#chats").prepend($message);
  app.send(message);
};

app.addRoom = function() {};


app.addFriend = function(username) {
  app.friends[username] = true;
};

app.handleSubmit = function() {};

app.changeRoom = function(room) {
  $("#chats").children().hide();
  $("#chats > ." + room).show();
};

app.populateRooms = function() {
  $("#roomSelector").empty();
  $("#roomSelector").append($.parseHTML("<option>New_Room</option>"))
  app.messages.forEach(function(item) {
    app.rooms[item.roomname] = true;
  });
  for (var key in app.rooms) {
      $temp = $("#roomSelector :first-child").clone();
      $temp.text(key);
      $temp.appendTo($("#roomSelector"));
  }
}

$(document).ready(app.init);
