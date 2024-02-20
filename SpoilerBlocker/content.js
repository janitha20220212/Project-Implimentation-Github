// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Send the post content to the service worker
    navigator.serviceWorker.controller.postMessage({
      action: 'checkForSpoilersInContent',
      content: document.documentElement.innerHTML
    });
  });
  
  // Listen for messages from the service worker
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data.action === "spoilerFound") {
      const postElement = document.querySelector(`a[href="${event.data.url}"]`).closest('.Post');
      postElement.style.backgroundColor = 'black';
    }
  });
