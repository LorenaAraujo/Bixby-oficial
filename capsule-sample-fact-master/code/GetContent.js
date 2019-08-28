const UTIL = require("./lib/util");
const CONTENT = require("./content");
const GET_REMOTE = require('./lib/getRemoteContent.js')

// GetContent
exports.function = function (searchTerm) {
  //You can replace with a call to a web api - make sure you map api response to content model
  var content = CONTENT
  var chosenContent

  // Hard coded searchTerm example to content retrieval from an API
  if ((searchTerm && searchTerm.toLowerCase() == 'eat') || (searchTerm && searchTerm.toLowerCase() == 'restaurant')){
    var eat = CONTENT.getEat();
    
    // Add a random dad image
    var eatImages = ['images/abare.jpg', 'images/ghiotto.jpg', 'images/banzeiro.jpg'];
    var image = eatImages[Math.floor(eatImages.length * Math.random())]

   return {
      text: eat,
      image: {
        url: image
      }
    }
  } else {
    // Get content from local content.js file 
    // filter based on searchTerm (note that if you use a web API, then filtering can be done in the web API itself)
    if (searchTerm) {
      content = UTIL.findContent(content, searchTerm)
    }

    //pick a random content
    if (content.length) {
      var index = Math.floor(content.length * Math.random())
      chosenContent = content[index]
    }
  }
  
  // return content if exists, else null (No Result)
  if (chosenContent) {
    return {
      text: chosenContent.text,
      image: chosenContent.image
    }
  } else {
    return null;
  }
}
