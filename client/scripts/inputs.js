function refreshMessages() {
  $('#refresh').click( function() {
    app.clearMessages();
    app.fetch();
  });
}

function submitMessage() {
  $('#submit').on('click', function() {
    // debugger;
    if ($("#roomInput").val()) {
      app.addMessage($("#textInput").val(), $("#roomInput").val());
    } else {
      app.addMessage($("#textInput").val());
    }
  });
}

function roomFilter() {
  $("#roomSelector").on('change', function() { app.changeRoom($("#roomSelector").val()); });
}

function friendListener() {
  $('.username').on('click', function() {
    console.log($(this).text());
    app.addFriend($(this).text());
  });
}

// function roomListener() {
//   $("#submit").click(function() {
//     app.addRoom($("#roomSelector").val());
//     app.addMessage($("#textInput").val(), $("#roomSelector").val());
//   })
// }
