var index = 0;
var totalThumb = peopleArray.length - 1;
var timer;

$(document).ready(function() {
  appendDom(peopleArray);
  addEventListeners();
  updateSelection();
  timer = setInterval(nextThumb, 10000);
});

function appendDom (array) {
  var name;
  var shoutout;
  for (var i = 0; i < array.length; i++) {
    name = array[i].name;
    shoutout = array[i].shoutout;
    createThumb(name, shoutout, i);
  }
}

function createThumb (name, shoutout, id) {
  var imgUrl = "images/" + name.split(" ").join("%20") + ".jpg";
  $('.container').append("<div id='"+ id +"'class='thumbnail'><img src='"+ imgUrl + "'/></div>");
  var $el = $('.container').children().last();
  $el.data({"name": name,
            "shoutout": shoutout,
            "url": imgUrl
  });
}

function addEventListeners () {
  $('#next').on('click', nextThumb);
  $('#prev').on('click', prevThumb);
}

function nextThumb () {
  $('.container').children('#' + index).removeClass('highlight');
  if (index === totalThumb) {
    index = 0;
  }
  else {
    index++;
  }
  $('.portrait').fadeOut(500, updateSelection);
  clearInterval(timer);
  timer = setInterval(nextThumb, 10000);
}

function prevThumb () {
  $('.container').children('#' + index).removeClass('highlight');
  if (index === 0) {
    index = totalThumb;
  }
  else {
    index--;
  }
  $('.portrait').fadeOut(500, updateSelection);
  clearInterval(timer);
  timer = setInterval(nextThumb, 10000);
}

function updateSelection() {

  var $el = $('.container').children('#' + index);
  console.log($el);
  $el.addClass('highlight');
  $('.name').text($el.data("name"));
  $('.shoutout').text($el.data("shoutout"));
  $('.portrait img').attr("src", $el.data("url"));
  $('.portrait').fadeIn(500);
}
