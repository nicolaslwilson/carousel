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
  var chiyak;
  for (var i = 0; i < array.length; i++) {
    name = array[i].name;
    shoutout = array[i].shoutout;
    chiyak = new Person (name, shoutout, i);
    addThumb(chiyak);
  }
}

function Person (name, shoutout, id) {
  this.name = name;
  this.shoutout = shoutout;
  this.id = id;
}

function addThumb (chiyak) {
  chiyak.imgUrl = imageURLFromName(chiyak.name);
  $('.container').append(createThumb(chiyak));
  var $el = $('.container').children().last();
  $el.data({"name": chiyak.name,
            "shoutout": chiyak.shoutout,
            "url": chiyak.imgUrl
  });
}

function imageURLFromName(name) {
  return "images/" + name.split(" ").join("%20") + ".jpg";
}

function createThumb(chiyak) {
  return "<div id='"+ chiyak.id +"'class='thumbnail'><img src='"+ chiyak.imgUrl + "'/></div>";
}

function addEventListeners () {
  $('#next').on('click', nextThumb);
  $('#prev').on('click', prevThumb);
  $('.container').on('click', '.thumbnail', selectThumb);
}

function nextThumb () {
  var prevIndex = index;
  if (index === totalThumb) {
    index = 0;
  }
  else {
    index++;
  }
  updateSelection(prevIndex);
  resetTimer();
}

function prevThumb () {
  var prevIndex = index;
  if (index === 0) {
    index = totalThumb;
  }
  else {
    index--;
  }
  updateSelection(prevIndex);
  resetTimer();
}

function selectThumb () {
  var prevIndex = index;
  index = $(this).attr('id');
  updateSelection(prevIndex);
  resetTimer();
}

function updateSelection(prevIndex) {
  $('.container').children('#' + prevIndex).removeClass('highlight');
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
