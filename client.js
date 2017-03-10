$(document).ready(function() {
  appendDom(peopleArray);
});

function appendDom (array) {
  var name;
  var shoutout;
  for (var i = 0; i < array.length; i++) {
    name = array[i].name;
    shoutout = array[i].shoutout;
    $('.container').append("<div id='"+ i +"' data-name='" + name +"' data-shoutout='" + shoutout +"' class='thumbnail'></div>");
  }
}
