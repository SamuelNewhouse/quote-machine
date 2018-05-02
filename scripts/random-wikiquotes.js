const WikiquoteApi = (() => {

  var wqa = {};

  const API_URL = "https://en.wikiquote.org/w/api.php";
  const retryLimit = 10;

  var minLength = 20;
  var maxLength = 300;
  var numericLimit = 0.1;

  wqa.setMinLength = (min) => minLength = min;
  wqa.setMaxLength = (max) => maxLength = max;
  wqa.setNumericLimit = (percentage) => numericLimit = percentage;

  /**
   * Get all quotes for a given section.  Most sections will be of the format:
   * <h3> title </h3>
   * <ul>
   *   <li> 
   *     Quote text
   *     <ul>
   *       <li> additional info on the quote </li>
   *     </ul>
   *   </li>
   * <ul>
   * <ul> next quote etc... </ul>
   *
   * The quote may or may not contain sections inside <b /> tags.
   *
   * For quotes with bold sections, only the bold part is returned for brevity
   * (usually the bold part is more well known).
   * Otherwise the entire text is returned.  Returns the titles that were used
   * in case there is a redirect.
   */
  wqa.getQuotesForSection = (pageId, sectionIndex) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: API_URL,
        dataType: "jsonp",
        data: {
          format: "json",
          action: "parse",
          noimages: "",
          pageid: pageId,
          section: sectionIndex
        },

        success: result => {
          if (!result.parse) // Some pages have no valid sections
            return reject("Page has no valid section");

          var removeLinks = html => $('<p>' + html + '</p>').text();

          var quotes = result.parse.text["*"];
          var quoteArray = []

          // Find top level <li> only
          var $lis = $(quotes).find('li:not(li li)');

          $lis.each(function () {
            // Remove all children that aren't <b> or <a>
            // Some quotes have links. Removing them here would ruin the quote
            $(this).children().remove(':not(b,a)');
            var $bolds = $(this).find('b');

            // If the section has bold text, use it.  Otherwise pull the plain text.
            if ($bolds.length > 0) {
              quoteArray.push(removeLinks($bolds.html())); // Safe to remove links here.
            } else {
              quoteArray.push(removeLinks($(this).html())); // Safe to remove links here.
            }
          });

          resolve({ titles: result.parse.title, quotes: quoteArray });
        },

        error: () => reject("Error getting quotes")
      });
    });
  };


  /**
  * Get the sections for a given page.
  * This makes parsing for quotes more manageable.
  * Returns an array of all "1.x" sections as these usually contain the quotes.
  * If no 1.x sections exists, returns section 1. Returns the titles that were used
  * in case there is a redirect.
  */
  wqa.getSectionsForPage = (pageId) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: API_URL,
        dataType: "jsonp",
        data: {
          format: "json",
          action: "parse",
          prop: "sections",
          pageid: pageId
        },

        success: result => {
          var sectionArray = [];
          var sections = result.parse.sections;
          for (var s in sections) {
            var splitNum = sections[s].number.split('.');
            if (splitNum.length > 1 && splitNum[0] === "1") {
              sectionArray.push(sections[s].index);
            }
          }
          // Use section 1 if there are no "1.x" sections
          if (sectionArray.length === 0) {
            sectionArray.push("1");
          }
          resolve({ pageId: pageId, titles: result.parse.title, sections: sectionArray });
        },

        error: () => reject("Error getting sections")
      });
    });
  };

  /**
   * Gets a random page id from the main namespace.
   */
  wqa.getRandomPage = () => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: API_URL,
        dataType: "jsonp",
        data: {
          format: "json",
          action: "query",
          redirects: "",
          list: "random",
          rnnamespace: 0,
          rnlimit: 1
        },

        success: result => {
          var id = result.query.random[0].id;

          if (id)
            resolve(id);
          else
            reject("No random page found");
        },

        error: () => reject("Error getting random page id")
      });
    });
  };

  /**
   * Gets a random quote from a random title in the main namespace
   * Quotes will either not be found or rejected for various reasons
   * Keeps trying for a valid quote until retryLimit is reached
   */
  wqa.getRandomQuote = () => {
    return new Promise((resolve, reject) => {
      var numRetry = 0;

      var randomNum = max => Math.floor(Math.random() * max);
      var randomSection = sections => sections[randomNum(sections.length)];
      var randomQuote = quotes => quotes.quotes[randomNum(quotes.quotes.length)];
      var chooseQuote = quotes => ({ title: quotes.titles, quote: randomQuote(quotes) });

      var checkQuote = quote => {
        if (!quote.quote) // Some pages have title and sections but no quotes
          return Promise.reject('No quote found');

        var length = quote.quote.length;
        var digitPercentage = (quote.quote.match(/\d/g) || []).length / length;

        if (length < minLength)
          return Promise.reject("Quote is too short");
        else if (length > maxLength)
          return Promise.reject("Quote is too long");
        else if (digitPercentage > numericLimit)  // Some quotes are just dates and times
          return Promise.reject("Quote is too numeric");
        else
          return quote;
      };

      var checkRetry = (reason) => {
        console.log(reason + ". Retrying...");
        numRetry++;

        if (numRetry >= retryLimit)
          reject("Retry limit reached");
        else
          mainSequence();
      }

      var mainSequence = () => {
        wqa.getRandomPage()
          .then(pageId => wqa.getSectionsForPage(pageId))
          .then(data => wqa.getQuotesForSection(data.pageId, randomSection(data.sections)))
          .then(quotes => chooseQuote(quotes))
          .then(quote => checkQuote(quote))
          .then(theQuote => resolve(theQuote))
          .catch(reason => checkRetry(reason));
      };

      mainSequence();
    });
  };

  return wqa;
})();