
console.log("extension loaded")

alert("this is outside of the event listener")

document.body.style.backgroundColor = "orange";

  const textField = document.createElement("input");
  textField.type = "text";
  textField.id = "myTextField"; // Add an ID to access this element later

  const button = document.createElement("button");
  button.textContent = "Generate";
  // button.classList.add("yt-spec-touch-feedback-shape__fill")
  button.id = "myButton"; // Add an ID to access this element later
  
  button.addEventListener("click", function () {
    // Add your code here to generate a blog post or perform any other action
    alert("Button clicked!");
  });

  const player = document.getElementById("player");
  player.insertAdjacentElement("afterend", textField);
  player.insertAdjacentElement("afterend", button);

  // const body = document.body;
  // body.prepend(textField, button);




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