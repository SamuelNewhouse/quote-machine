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
    WikiquoteApi.getRandomQuote().then( (result) => {
      console.log(result);
      $("#quote").html(result.quote);
      $("#author").html('- ' + result.title);
    });
  };
});