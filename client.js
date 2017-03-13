//Index stores the current selection in the carousel, lastThumb stores the index of the last thumbnail
var index = 0;
var lastThumb = peopleArray.length - 1;

//Timer object stores timer IDs from setInterval, as well as values for length of interval and transition time
var timer = {};
timer.interval = 10000;
timer.fadeTime = 300;

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

function addEventListeners () {
  $('.next').on('click', nextThumb);
  $('.prev').on('click', prevThumb);
  $('.thumbnails').on('click', '.thumbnail', selectThumb);
}

/**
  **
  *Creates a Chiyak object used to store name, shoutout, id and imgUrl.
  *@function Chiyak
  *@param {String} name      Name of person represented by this object
  *@param {String} shoutout  Shoutout about this person
  *@param {Number} id        ID derived from array index
  **
*/
function Chiyak (name, shoutout, id) {
  this.name = name;
  this.shoutout = shoutout;
  this.id = id;
}

/**
  **
  *Adds a thumbnail to the page with data from the Chiyak object passed in
  *@function addThumb
  *@param {Object} chiyak  Chiyak object that the created thumbnail will represent on the page
  **
*/
function addThumb (chiyak) {
  //Call imageURLFromName to create an Identicon and store a reference to it
  chiyak.imgUrl = imageURLFromName(chiyak.name);
  //Call createThumb and append the HTML returned to the page
  var thumbnail = createThumb(chiyak);
  $('.thumbnails').append(thumbnail);
  //Store the data from the Chiyak object in the new thumbnail's data property
  var $el = $('.thumbnails').children().last();
  $el.data({"name": chiyak.name,
            "shoutout": chiyak.shoutout,
            "imgUrl": chiyak.imgUrl
  });
}

/**
  **
  *Creates a PNG Identicon from a hash of the Chiyak's name, return a reference to that image
  *@function imageURLFromName
  *@param {String} name Name of Chiyak who will be represented by this image
  *@return {String}     String that can be used inside an img element to reference the icon
  **
*/
function imageURLFromName(name) {
  //Create a hash from a name string
  var hash = name.hashCode().toString();
  var options = {
    background: [255,255,255,0],
    size: 500
  };
  //Creates an identicon from the hash
  var icon = new Identicon(hash, options).toString();
  //Returns a string containing a reference to the created icon
  return "data:image/png;base64," + icon;
}

/**
  **
  *Creates HTML elements for a thumbnail representing a Chiyak
  *@function createThumb
  *@param {Object} chiyak Chiyak object that the created thumbnail will represent on the page
  *@return {String}       HTML data as a string
  **
*/
function createThumb(chiyak) {
  return "<div id='"+ chiyak.id +"'class='thumbnail'><img src='" + chiyak.imgUrl + "'/></div>";
}

/**
  **
  *Advances selection to next thumbnail in the carousel,
  *calls updateSelection to update the page and resets the autoadvance timer.
  *@function nextThumb
  **
*/
function nextThumb () {
  //Store index of previous selection
  var prevIndex = index;
  //Update index to current selection, if at last index, cycle to first index
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

/**
  **
  *Returns selection to previous thumbnail in the carousel,
  *calls updateSelection to update the page and resets the autoadvance timer.
  *@function prevThumb
  **
*/
function prevThumb () {
  //Store index of previous selection
  var prevIndex = index;
  //Update index to current selection, if at first index, cycle to last index
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

/**
  **
  *Changes selection to the clicked thumbnail in the carousel,
  *calls updateSelection to update the page and resets the autoadvance timer.
  *@function selectThumb
  **
*/
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

/**
  **
  *Updates page to indicate current selection
  *Calls updatePortrait to update #portrait with data from current selection
  *@function updateSelection
  **
*/
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
  **
  *Updates #portrait div with data from the selected
  *@function updatePortrait
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
