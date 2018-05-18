$(() => {
  var allQuotes = [];
  var quoteIndex = -1;

  $("#new-quote").click(addQuote);
  $("#left-arrow").click(backOne);
  $("#right-arrow").click(forwardOne);

  function updateArrows() {
    if (quoteIndex == 0)
      $("#left-arrow").css('visibility', 'hidden');
    else
      $("#left-arrow").css('visibility', 'visible');

    if (quoteIndex == allQuotes.length - 1)
      $("#right-arrow").css('visibility', 'hidden');
    else
      $("#right-arrow").css('visibility', 'visible');
  };

  function setDisplay(info) {
    var infoSearch = info.quote + " " + info.title;
    var tweet = info.quote + " - " + info.title;
    var infoUrl = "https://www.google.com/search?q=" + encodeURIComponent(infoSearch);
    var twitterUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweet);

    $("#quote").html(info.quote);
    $("#author").html('- ' + info.title);
    $("#more-info h2").html('<a href="' + infoUrl + '" target="_blank">More Info</a>');
    $("#twitter-logo a").attr("href", twitterUrl);
    $("#twitter-logo a").attr("target", "_blank");

    updateArrows();
  };

  function addQuote() {
    WikiquoteApi.getRandomQuote().then(
      success => {
        allQuotes.splice(quoteIndex + 1, 0, success);
        quoteIndex++;
        setDisplay(success);
      },
      failure => console.log(failure)
    );
  };

  function backOne() {
    if (quoteIndex > 0) {
      quoteIndex--;
      setDisplay(allQuotes[quoteIndex]);
    }
  }

  function forwardOne() {
    if (quoteIndex < allQuotes.length - 1) {
      quoteIndex++;
      setDisplay(allQuotes[quoteIndex]);
    }
  }

  addQuote();
});