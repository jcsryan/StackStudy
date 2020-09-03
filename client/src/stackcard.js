var cardy = ('.cardy');
var lastCard = (".card-list .card").length - 1;

function next (){ 
  var prependList = function() {
    if( ('.cardy').hasClass('activeNow') ) {
      var slicedCard = ('.cardy').slice(lastCard).removeClass('transformThis activeNow');
      ('ul').prepend(slicedCard);
    }
  }
  ('li').last().removeClass('transformPrev').addClass('transformThis').prev().addClass('activeNow');
  setTimeout(function(){prependList(); }, 150);
};

function prev () {
  var appendToList = function() {
    if( ('.cardy').hasClass('activeNow') ) {
      var slicedCard = ('.cardy').slice(0, 1).addClass('transformPrev');
      ('.cardy-list').append(slicedCard);
    }}
  
      ('li').removeClass('transformPrev').last().addClass('activeNow').prevAll().removeClass('activeNow');
  setTimeout(function(){appendToList();}, 150);
};

export {next, prev};