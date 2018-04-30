$(function () {
  $("button").click(getQuote);

  function getQuote(){
    //WikiquoteApi.getRandomQuote("Mr. Sunshine (2011 TV series)", console.log, console.log );
    WikiquoteApi.getRandomQuote().then(console.log, console.log);
  }

});