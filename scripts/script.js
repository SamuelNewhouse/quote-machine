$(document).ready(function() {  
  var quotes =
  [
    ["Epictetus", "Wealth consists not in having great possessions, but in having few wants.", "http://en.wikipedia.org/wiki/Epictetus"],
    ["Epictetus", "What is the first business of one who practices philosophy? To get rid of self-conceit. For it is impossible for anyone to begin to learn that which he thinks he already knows.", "http://en.wikipedia.org/wiki/Epictetus"],
    ["Dr.Seuss","Don't cry because it's over, smile because it happened.","http://en.wikipedia.org/wiki/Dr._Seuss"],
    ["J.K. Rowling","If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.","http://en.wikipedia.org/wiki/J._K._Rowling"],
    ["Eleanor Roosevelt","No one can make you feel inferior without your consent.","http://en.wikipedia.org/wiki/Eleanor_Roosevelt"],
    ["Mark Twain","If you tell the truth, you don't have to remember anything.","http://en.wikipedia.org/wiki/Mark_Twain"],
    ["Maya Angelou","I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.","http://en.wikipedia.org/wiki/Maya_Angelou"],
    ["Oscar Wilde","To live is the rarest thing in the world. Most people exist, that is all.","http://en.wikipedia.org/wiki/Oscar_Wilde"],
    ["Mark Twain","The man who does not read has no advantage over the man who cannot read.","http://en.wikipedia.org/wiki/Mark_Twain"],
    ["J.K. Rowling","It is impossible to live without failing at something, unless you live so cautiously that you might as well not have lived at all - in which case, you fail by default.","http://en.wikipedia.org/wiki/J._K._Rowling"],
    ["George Bernard Shaw","Life isn't about finding yourself. Life is about creating yourself.","http://en.wikipedia.org/wiki/George_Bernard_Shaw"],
    ["George Bernard Shaw","The reasonable man adapts himself to the world: the unreasonable one persists in trying to adapt the world to himself. Therefore all progress depends on the unreasonable man.","http://en.wikipedia.org/wiki/George_Bernard_Shaw"],
    ["Theodore Roosevelt","People don't care how much you know until they know how much you care","http://en.wikipedia.org/wiki/Theodore_Roosevelt"],
    ["Theodore Roosevelt","Knowing what's right doesn't mean much unless you do what's right.","http://en.wikipedia.org/wiki/Theodore_Roosevelt"],
    ["Alexandre Dumas fils","The difference between genius and stupidity is: genius has its limits.","http://en.wikipedia.org/wiki/Alexandre_Dumas,_fils"],
    ["Terry Pratchett","The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it.","http://en.wikipedia.org/wiki/Terry_Pratchett"],
    ["Yogi Berra","The future ain’t what it used to be.","http://en.wikipedia.org/wiki/Yogi_Berra"],
    ["Yogi Berra","You can observe a lot by just watching.","http://en.wikipedia.org/wiki/Yogi_Berra"],
    ["Yogi Berra","It ain’t over till it’s over.","http://en.wikipedia.org/wiki/Yogi_Berra"],
    ["Mark Twain","′Classic′ - a book which people praise and don't read.","http://en.wikipedia.org/wiki/Mark_Twain"],
    ["Mark Twain","Keep away from people who try to belittle your ambitions. Small people always do that, but the really great make you feel that you, too, can become great.","http://en.wikipedia.org/wiki/Mark_Twain"],
    ["Plato","Wise men speak because they have something to say; fools because they have to say something.","http://en.wikipedia.org/wiki/Plato"],
    ["Plato","We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.","http://en.wikipedia.org/wiki/Plato"],
    ["Plato","Never discourage anyone...who continually makes progress, no matter how slow.","http://en.wikipedia.org/wiki/Plato"]
  ];
  
  var wikiLink = "http://www.wikipedia.com";
  var curQuote = "";
  var curAuthor = "";
  
  function loadQuoteInfo(){
    var index = Math.floor(Math.random() * quotes.length);
    curQuote = quotes[index][1];
    curAuthor = quotes[index][0];
    $(".quote").html('<h2>"' + curQuote + '"</h2>');
    $(".author").html('<h3>- ' + curAuthor + '</h3>');
    wikiLink = quotes[index][2];
  }
  
  loadQuoteInfo();
  
  $("#newQuote").on("click", loadQuoteInfo);
  
  $("#authorInfo").on("click", function() {
    window.open(wikiLink, "_blank");
    window.focus();
  });
  
  $("#tweetQuote").on("click", function() {
    window.open("http://twitter.com/home/?status=" + curQuote + " - " + curAuthor, "_blank");
    window.focus();
  }); 
  
  $("#authorLink").on("click", function() {
    window.open("http://codepen.io/SamuelNewhouse", "_blank");
    window.focus();
  }); 
});