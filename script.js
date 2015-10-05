

// Building squares
for(var i = 0; i < 20; i++) {
  $("#gameboard").append("<div class='pieceContainer'><div class='pieceFront'></div><div class='pieceBack'></div> </div>");
};

// Onclick for Skin Changes
$('h3[name=beach]').on('click',function(){
  $('body').addClass("beach");
  $('#gameboard').addClass("beach");
  $('body').removeClass("mountains");
  $('#gameboard').removeClass("mountains");
  $('h3').css('color','black')
});

$('h3[name=forest]').on('click',function(){
  $('body').removeClass("beach mountains");
  $('#gameboard').removeClass("beach mountains");
  $('h3').css('color','white')
});
$('h3[name=mountains]').on('click',function(){
  $('body').addClass("mountains");
  $('#gameboard').addClass("mountains");
  $('h3').css('color','black')
});

var memory = {

  timeKeeper: undefined,
  cards: document.querySelectorAll( ".pieceBack" ),
  randomTracker: [],
  // onClick events
  onClick: function() {
    // Create a onclick event to rotate the squares
    $(".pieceContainer" ).on( "click" , function() {
      $( this ).addClass( "flip" );
    });
    $( ".pieceContainer" ).on( "click" , memory.time );
    $( "button" ).on( "click" , memory.clear );
    },
  // functions
  time: function() {
    memory.timeKeeper = setTimeout( memory.compareFlipped , 500 );
  },
  // using Math, chooses randomly how to set up board
  randomCounter: function() {
    while(memory.randomTracker.length < 10) {
      var randomNum = Math.floor((Math.random() * 10) + 1);
      var found = false;
      for(var i = 0; i < memory.randomTracker.length; i++) {
        if (memory.randomTracker[i] == randomNum) {found=true; break}
      }
      if (!found)memory.randomTracker[memory.randomTracker.length] = randomNum;
      }
    }, // end of randomCounter
  setSquare: function() {
  for(var i = 0; i < memory.cards.length; i++ ) {
  var counter = 0;
    if (memory.randomTracker.length == 0) {
      memory.randomCounter();
    }
    counter = memory.randomTracker.pop();
    memory.cards[i].setAttribute( "data-id" , counter);
    }
  }, // end setSquare
  compareFlipped: function() {
    clearTimeout(memory.timeKeeper);
    var flipped = $( ".flip" );
    if(flipped.length == 2) {
      var flipOne = $( ".flip .pieceBack" ).eq(0).attr( "data-id" );
      var flipTwo = $( ".flip .pieceBack" ).eq(1).attr( "data-id" );
      if(flipOne == flipTwo) {
        $( ".flip" ).addClass( "stayFlipped" );
        $( ".pieceContainer" ).removeClass( "flip" );
        memory.winner();
      } else if (flipOne != flipTwo ) {
        $( ".pieceContainer" ).removeClass( "flip" );
      }
    }
  }, // end compareFlipped;
  winner: function() {
  var winner = $( ".stayFlipped");
  if(winner.length == 20) {
    $( ".pieceContainer" ).addClass( "winner" );
    $( "#gameboard" ).prepend( "<h2>WINNER!!!!!!</h2>" );
    }
  },
  clear: function() {
   $( ".pieceContainer").removeClass( "stayFlipped" );
   $( ".pieceContainer").removeClass( "winner" );
   $( ".pieceBack" ).removeAttr( "data-id" );
   $( "h2" ).remove();
   memory.randomCounter();
   memory.setSquare();
 }

} // end of object

memory.onClick();
memory.randomCounter();  // set randomTracker to mix up square data-ids
memory.setSquare(); // puts background-image in squares
