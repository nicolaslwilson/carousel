var index = 0;
var totalThumb = peopleArray.length - 1;


var timer = {};
timer.interval = 10000;

$(document).ready(function() {
  appendDom(peopleArray);
  addEventListeners();
  updateSelection();
  resetTimer();
});

function appendDom (array) {
  var name, shoutout, chiyak;
  for (var i = 0; i < array.length; i++) {
    name = array[i].name;
    shoutout = array[i].shoutout;
    chiyak = new Chiyak (name, shoutout, i);
    addThumb(chiyak);
  }
}

function Chiyak (name, shoutout, id) {
  this.name = name;
  this.shoutout = shoutout;
  this.id = id;
}

function addThumb (chiyak) {
  chiyak.imgUrl = imageURLFromName(chiyak.name);

  var thumbnail = createThumb(chiyak);
  $('.container').append(thumbnail);

  var $el = $('.container').children().last();
  $el.data({"name": chiyak.name,
            "shoutout": chiyak.shoutout,
            "imgUrl": chiyak.imgUrl
  });
}

function imageURLFromName(name) {
  return "images/" + name.split(" ").join("%20") + ".jpg";
}

function createThumb(chiyak) {
  return "<div id='"+ chiyak.id +"'class='thumbnail'><img src='" + chiyak.imgUrl + "'/></div>";
}

function addEventListeners () {
  $('.next').on('click', nextThumb);
  $('.prev').on('click', prevThumb);
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
  //Store index of previous selection
  var prevIndex = index;
  //Update index to current selection
  if (index === 0) {
    index = totalThumb;
  }
  else {
    index--;
  }
  //Call updateSelection to update #portrait and .thumbnail
  updateSelection(prevIndex);
  //Reset timer
  resetTimer();
}

function selectThumb () {
  //Store index of previous selection
  var prevIndex = index;
  //Update index to current selection
  index = $(this).attr('id');
  //Call updateSelection to update #portrait and .thumbnail
  updateSelection(prevIndex);
  //Reset timer
  resetTimer();
}

function updateSelection(prevIndex) {
  //Remove .highlight on previous selection
  var $prev = $('.container').children('#' + prevIndex);
  $prev.removeClass('highlight');
  //Add .highlight to current selection
  var $el = $('.container').children('#' + index);
  $el.addClass('highlight');
  //fadeOut previous #portrait data and call updatePortrait
  $('#portrait').fadeOut(500, function (){
    updatePortrait($el);
  });
}

function updatePortrait ($el) {
  //Update #portrait div with name, shoutout and image for currently selected chiyak
  $('#portrait .name').text($el.data("name"));
  $('#portrait .shoutout').text($el.data("shoutout"));
  $('#portrait img').attr("src", $el.data("imgUrl"));
  //fadeIn updated #portrait div
  $('#portrait').fadeIn(500);
}

function resetTimer() {
  //If a timer already exists, clear it
  if (timer.id) {
    clearInterval(timer);
  }
  //Create a new timer and assign it's id to timer.id.
  timer.id = setInterval(nextThumb, timer.interval);
}
