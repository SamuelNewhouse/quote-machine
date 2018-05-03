$(function () {
  var allQuotes = [];
  var quoteIndex = -1;

  $("#new-quote").click(addQuote);

  function setDisplay(info) {
    $("#quote").html(info.quote);
    $("#author").html('- ' + info.title);
    $("#more-info h2").html('<a href="https://www.google.com/search?q=' + info.title + '" target="_blank">More Info</a>');
  };

  function addQuote() {
    WikiquoteApi.getRandomQuote().then(
      (success) => {
        console.log(success);        
        allQuotes.splice(quoteIndex + 1, 0, success);        
        quoteIndex++;
        setDisplay(success);
      },
      (failure) => console.log(failure)
    );
  };

  function backOne() {
    if (quoteIndex > 0) {
      quoteIndex--;
      setDisplay(allQuotes[quoteIndex]);
    }
  }
});