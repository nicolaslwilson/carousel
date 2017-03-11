var index = 0;
var totalThumb = peopleArray.length - 1;


var timer;
var timerInterval = 10000;

$(document).ready(function() {
  appendDom(peopleArray);
  addEventListeners();
  updateSelection();
  resetTimer();
});

function appendDom (array) {
  var name;
  var shoutout;
  for (var i = 0; i < array.length; i++) {
    name = array[i].name;
    shoutout = array[i].shoutout;
    addThumb(name, shoutout, i);
  }
}

function addThumb (name, shoutout, id) {
  var imgUrl = "images/" + name.split(" ").join("%20") + ".jpg";
  $('.container').append(createThumb(name, shoutout, id, imgUrl));
  var $el = $('.container').children().last();
  $el.data({"name": name,
            "shoutout": shoutout,
            "url": imgUrl
  });
}

function createThumb(name, shoutout, id, imgUrl) {
  return "<div id='"+ id +"'class='thumbnail'><img src='"+ imgUrl + "'/></div>";
}

function addEventListeners () {
  $('#next').on('click', nextThumb);
  $('#prev').on('click', prevThumb);
  $('.container').on('click', '.thumbnail', selectThumb);
}

function nextThumb () {
  $('.container').children('#' + index).removeClass('highlight');
  if (index === totalThumb) {
    index = 0;
  }
  else {
    index++;
  }
  updateSelection();
  resetTimer();
}

function prevThumb () {
  $('.container').children('#' + index).removeClass('highlight');
  if (index === 0) {
    index = totalThumb;
  }
  else {
    index--;
  }
  updateSelection();
  resetTimer();
}

function selectThumb () {
  $('.container').children('#' + index).removeClass('highlight');
  index = $(this).attr('id');
  updateSelection();
  resetTimer();
}

function updateSelection() {
  var $el = $('.container').children('#' + index);
  $el.addClass('highlight');
  $('#portrait').fadeOut(500, function (){
    updatePortrait($el);
  });
}

function updatePortrait ($el) {
  $('.name').text($el.data("name"));
  $('.shoutout').text($el.data("shoutout"));
  $('#portrait img').attr("src", $el.data("url"));
  $('#portrait').fadeIn(500);
}

function resetTimer() {
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(nextThumb, timerInterval);
  console.log(timer);
}
