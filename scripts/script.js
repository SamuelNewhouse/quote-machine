$(function () {
  $("#new-quote").click(addQuote);

  function addQuote() {
    WikiquoteApi.getRandomQuote().then( (result) => {
      console.log(result);
      $("#quote").html(result.quote);
      $("#author").html('- ' + result.title);
    });
  };
});