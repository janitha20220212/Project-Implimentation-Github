// Function to check for spoilers in a Reddit post
async function checkForSpoilers(request) {
  try {
    // Fetch the post content
    const response = await fetch(request);
    const postContent = await response.text();

    // Check if the post contains any spoilers
    const hasSpoilers = checkForSpoilersInContent(postContent);

    // If the post contains spoilers, send a message to the content script
    if (hasSpoilers) {
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ action: "spoilerFound", url: request.url });
        });
      });
    }

    // Return the original response
    return response;
  } catch (error) {
    // If an error occurs, return an error response
    return new Response('Error checking for spoilers', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  }
}

// Listen for fetch events
self.addEventListener('fetch', event => {
  // Check if the request is for a Reddit post
  if (event.request.url.startsWith('https://www.reddit.com/r/')) {
    // Intercept the request and check for spoilers
    event.respondWith(checkForSpoilers(event.request));
  }
});

// Listen for messages from the content script
self.addEventListener('message', event => {
  if (event.data.action === 'checkForSpoilersInContent') {
    const hasSpoilers = checkForSpoilersInContent(event.data.content);
    event.ports[0].postMessage({ hasSpoilers });
  }
});

// Function to check for spoilers in post content
function checkForSpoilersInContent(content) {
  // Define the marvelWords and spoilerKeywords arrays
  const marvelWords = ["Iron Man", "Captain America", "Thor", "Spider-Man", "Avengers", "Hulk", "No Way Home", "Deadpool", "Godzilla", "Marvel", "Madame", "X-Men", "Fantastic"];
  const spoilerKeywords = ["dies", "killed", "death", "ending", "spoiler", "plot twist", "reveals", "appears", "ends", "cameo", "spoilers", "leak", "spoiler", "Wolverine", "Kong", "Cast", "Web", "97", "Four", "Sony"];

  // Check if the content contains any words from the marvelWords or spoilerKeywords arrays
  const containsMarvelWord = marvelWords.some(word => content.includes(word));
  const containsSpoilerKeyword = spoilerKeywords.some(word => content.includes(word));

  // Return true if the content contains both a marvel word and a spoiler keyword
  return containsMarvelWord && containsSpoilerKeyword;
}
