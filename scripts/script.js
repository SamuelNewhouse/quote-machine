$(document).ready(function() {
  var wikiLink = "";
  var curQuote = "";
  var curAuthor = "";
  var quotesArray = [];

  function loadQuoteInfo() {
    var index = Math.floor(Math.random() * quotesArray.length);
    curQuote = quotesArray[index].quote;
    curAuthor = quotesArray[index].author;
    $(".quote").html('<h2>"' + curQuote + '"</h2>');
    $(".author").html('<h3>- ' + curAuthor + '</h3>');
    wikiLink = quotesArray[index].wikiLink;
  }

  $.getJSON("data/quotes.json", function( data ) {
    quotesArray = data.quotesArray;
    loadQuoteInfo();
  });  
  
  $("#newQuote").on("click", loadQuoteInfo);
  
  $("#authorInfo").on("click", function() {
    window.open(wikiLink, "_blank");
    window.focus();
  });
  
  $("#tweetQuote").on("click", function() {
    window.open("https://twitter.com/home/?status=" + curQuote + " - " + curAuthor, "_blank");
    window.focus();
  }); 
  
  $("#authorLink").on("click", function() {
    window.open("https://github.com/SamuelNewhouse", "_blank");
    window.focus();
  }); 
});