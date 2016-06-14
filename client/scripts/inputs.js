function refreshMessages() {
  $('#refresh').click( function() {
    app.clearMessages();
    app.fetch();
  });
}

function submitMessage() {
  $('#submit').click(function() {
    app.addMessage($("#textInput").val());
  });
}

function roomFilter() {
  $("#roomSelector").on('change', app.changeRoom($("#roomSelector").val()));
}
