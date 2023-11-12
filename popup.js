document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const generateButton = document.getElementById('generateButton');
    const trashButton = document.getElementById('trash')
    const clipboardButton = document.getElementById('clipboard');

    trashButton.addEventListener('click', function(){
      chrome.storage.local.remove('persistedText', function() {
        // After removing the item, update the popup text
        updatePopupText("");
      })
    })


    

    clipboardButton.addEventListener('click', function(){
      chrome.storage.local.get(['persistedText'], function(result) {
        const persistedText = result.persistedText;
        if (persistedText) {
          const extractedText = extractTextFromHTML(persistedText);

          // Use the Clipboard API to copy the text to the clipboard
          navigator.clipboard.writeText(extractedText)
            .then(() => {
              const imgElement = clipboardButton.querySelector('img');

              // Change the src attribute to images/check.png
              imgElement.src = 'images/check.png';

              // Set a timeout to revert the src attribute after two seconds
              setTimeout(function () {
                imgElement.src = 'images/clipboard.png';
              }, 2000);
            })
            .catch((err) => {
              console.error('Unable to copy text to clipboard', err);
            });
        }
      })   
    })

    function extractTextFromHTML(htmlString) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
  
      // Get all text nodes within the document body
      const textNodes = document.createTreeWalker(
          doc.body,
          NodeFilter.SHOW_TEXT,
          null,
          false
      );
  
      let extractedText = '';
  
      // Iterate through text nodes and concatenate their text content
      while (textNodes.nextNode()) {
        const nodeValue = textNodes.currentNode.nodeValue.trim();
        if (nodeValue !== '') {
          extractedText += nodeValue + '\n';
        }
      }
      return extractedText.trim();
  }
  
  
  

    // Load the persisted text when the popup is opened
    chrome.storage.local.get(['persistedText'], function(result) {
      const persistedText = result.persistedText;
      if (persistedText) {
        updatePopupText(persistedText);
      }
      
  });
  


    generateButton.addEventListener('click', function() {
      const task = taskInput.value;
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const videoId = extractVideoId(tabs[0].url);
        if (videoId && task) {
          // Send data to the API endpoint
          sendDataToAPI(videoId, task);
        } else {
          console.error('Failed to extract video ID from the YouTube page URL or no task defined');
        }
      });
    });
  
    function extractVideoId(url) {
      const videoIdMatch = url.match(/v=([A-Za-z0-9_\-]+)/);
      if (videoIdMatch) {
        return videoIdMatch[1];
      }
      return null;
    }
  
    function sendDataToAPI(videoId, task) {
      updatePopupText("")
      
      const generateButtonImg = generateButton.querySelector('img');

      // Change the src attribute to the loading indicator
      generateButtonImg.src = 'images/spinner-gap.png';
      generateButtonImg.classList.add('loading-spinner');

      fetch('http://127.0.0.1:8000/api/perform-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoId, task: task }),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from your server...
          const completionText = data.completion.text;

          // Save the text to local storage
          chrome.storage.local.set({ 'persistedText': completionText }, function() {
            updatePopupText(completionText);
          });
        })
        .catch(error => {
          console.error('Error:', error);
        })
        .finally(() => {
          taskInput.value = "";
          // Revert the src attribute after fetch request complete
          generateButtonImg.classList.remove('loading-spinner');
          generateButtonImg.src = 'images/send.png'
        });
  }


    // Function to update the text in your popup
    function updatePopupText(text) {
        // Assuming you have an element with the ID "popupText" to display the text
        const popupTextElement = document.getElementById('popupText');
        if (popupTextElement) {
        popupTextElement.innerHTML = text;
        }
    }

  });