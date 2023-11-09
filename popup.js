document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const generateButton = document.getElementById('generateButton');

    // Load the persisted text when the popup is opened
    chrome.storage.local.get(['persistedText'], function(result) {
      const persistedText = result.persistedText;
      updatePopupText(persistedText);
  });
  

    generateButton.addEventListener('click', function() {
      const task = taskInput.value;
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const videoId = extractVideoId(tabs[0].url);
        if (videoId) {
          // Send data to the API endpoint
          sendDataToAPI(videoId, task);
        } else {
          console.error('Failed to extract video ID from the YouTube page URL');
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