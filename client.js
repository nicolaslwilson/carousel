//Index stores the current selection in the carousel, lastThumb stores the index of the last thumbnail
var index = 0;
var lastThumb = peopleArray.length - 1;


var timer = {};
timer.interval = 10000;
timer.fadeTime = 500;

$(document).ready(function() {
  //Populate the page with data from peopleArray
  appendDom(peopleArray);
  //Add event listeners for button clicks
  addEventListeners();
  //Update page with information from default selection
  updateSelection();
  //Create initial timer to advance through slides every automatically
  resetTimer();
});

function appendDom (array) {
  //For each element in the data array passed in create a thumbnail on the page with data from the array
  var name, shoutout, chiyak;
  for (var i = 0; i < array.length; i++) {
    name = array[i].name;
    shoutout = array[i].shoutout;
    chiyak = new Chiyak (name, shoutout, i);
    addThumb(chiyak);
  }
  //Set the span of text on the page that indicates number of thumbnails in the carousel equal to the length of the data array
  $('#totalThumbs').text(' / ' + (peopleArray.length));
}

function Chiyak (name, shoutout, id) {
  this.name = name;
  this.shoutout = shoutout;
  this.id = id;
}

function addThumb (chiyak) {
  chiyak.imgUrl = imageURLFromName(chiyak.name);

  var thumbnail = createThumb(chiyak);
  $('.thumbnails').append(thumbnail);

  var $el = $('.thumbnails').children().last();
  $el.data({"name": chiyak.name,
            "shoutout": chiyak.shoutout,
            "imgUrl": chiyak.imgUrl
  });
}

function imageURLFromName(name) {
  var hash = name.hashCode().toString();
  var options = {
    background: [255,255,255,0],
    size: 500
  };
  var icon = new Identicon(hash, options).toString();
  return "data:image/png;base64," + icon;
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
  //Store index of previous selection
  var prevIndex = index;
  //Update index to current selection
  console.log(index, lastThumb);
  if (index === lastThumb) {
    index = 0;
  }
  else {
    index++;
  }
  //Call updateSelection to update #portrait and .thumbnail
  updateSelection(prevIndex);
  //Reset timer
  resetTimer();
}

function prevThumb () {
  //Store index of previous selection
  var prevIndex = index;
  //Update index to current selection
  if (index === 0) {
    index = lastThumb;
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
  //We only need to update the page if the clicked div is different than the current selection
  if (index !== $(this).attr('id')) {
    //Store index of previous selection
    var prevIndex = index;
    //Update index to current selection
    index = parseInt($(this).attr('id'));
    //Call updateSelection to update #portrait and .thumbnail
    updateSelection(prevIndex);
  }
  //Reset timer
  resetTimer();
}

function updateSelection(prevIndex) {
  //Remove .highlight on previous selection
  var $prev = $('.thumbnails').children('#' + prevIndex);
  $prev.removeClass('highlight');
  //Add .highlight to current selection
  var $el = $('.thumbnails').children('#' + index);
  $el.addClass('highlight');
  //Change text on page to indicate current selected index
  $('#index').text(index + 1);
  //fadeOut previous #portrait data and then call updatePortrait
  $('#portrait').fadeOut(timer.fadeTime, function (){
    updatePortrait($el);
  });
}


/**
  Updates #portrait div with data from the selected
  *@function resetTimer
  *@return
  **
*/
function updatePortrait ($el) {
  //Update #portrait div with name, shoutout and image for currently selected chiyak
  $('#portrait .name').text($el.data("name"));
  $('#portrait .shoutout').text($el.data("shoutout"));
  $('#portrait img').attr("src", $el.data("imgUrl"));
  //fadeIn updated #portrait div
  $('#portrait').fadeIn(timer.fadeTime);
}

/**
  Resets current timer, if any, and creates new timer
  *@function resetTimer
  *@return
  **
*/
function resetTimer() {
  //If a timer already exists, clear it
  if (timer.id) {
    clearInterval(timer.id);
  }
  //Create a new timer and assign it's id to timer.id.
  timer.id = setInterval(nextThumb, timer.interval);
}
