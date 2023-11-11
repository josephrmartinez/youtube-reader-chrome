
var parentDiv = document.getElementById("secondary"); // the parent div
var newDiv = document.createElement("div"); // the new div to be inserted
newDiv.textContent = "This is a new div";

if (parentDiv.firstChild) {
 parentDiv.insertBefore(newDiv, parentDiv.firstChild);
} else {
 parentDiv.appendChild(newDiv);
}

  
// const textField = document.createElement("input");
// textField.type = "text";
// textField.id = "myTextField"; // Add an ID to access this element later

// const button = document.createElement("button");
// button.textContent = "Generate";
// // button.classList.add("yt-spec-touch-feedback-shape__fill")
// button.id = "myButton"; // Add an ID to access this element later

// button.addEventListener("click", function () {
//   // Add your code here to generate a blog post or perform any other action
//   alert("Button clicked!");
// });





// const article = document.querySelector("article");

// // `document.querySelector` may return null if the selector doesn't match anything.
// if (article) {
//   const text = article.textContent;
//   const wordMatchRegExp = /[^\s]+/g; // Regular expression
//   const words = text.matchAll(wordMatchRegExp);
//   // matchAll returns an iterator, convert to array to get word count
//   const wordCount = [...words].length;
//   const readingTime = Math.round(wordCount / 200);
//   const badge = document.createElement("p");
//   // Use the same styling as the publish information in an article's header
//   badge.classList.add("color-secondary-text", "type--caption");
//   badge.textContent = `⏱️ ${readingTime} min read`;

//   // Support for API reference docs
//   const heading = article.querySelector("h1");
//   // Support for article docs with date
//   const date = article.querySelector("time")?.parentNode;

//   (date ?? heading).insertAdjacentElement("afterend", badge);
// }