// content.js 

const marvelWords = ["Iron Man", "Kang", "Captain America", "Thor", "Spider-Man", "Avengers", "Hulk", "No Way Home", "Deadpool", "Godzilla", "Marvel", "Madame", "X-Men", "Fantastic", "This", "The", "it"];
const spoilerKeywords = ["dies", "Dynasty", "killed", "death", "ending", "spoiler", "plot twist", "reveals", "appears", "ends", "cameo", "spoilers", "leak", "spoiler", "Wolverine", "Kong", "Cast", "Web", "97", "Four", "Sony", "a", "is"];

let blockSpoilers = true;

chrome.storage.local.get('blockSpoilers', function(data) {
  blockSpoilers = data.blockSpoilers;
});

// Initialize the votes object
const votes = {};

function checkForSpoilers() {
  if (!blockSpoilers) return;

  let spoilerCount = 0; // Initialize counter
  const elements = document.querySelectorAll('[data-testid="post-title-text"], [slot="title"], [slot="text-body"], [data-post-click-location="text-body"]');

  elements.forEach(element => {
    const elementText = element.textContent.toLowerCase();
    const containsMarvelWord = marvelWords.some(word => elementText.includes(word.toLowerCase()));
    const containsSpoilerKeyword = spoilerKeywords.some(word => elementText.includes(word.toLowerCase()));

    if (containsMarvelWord && containsSpoilerKeyword) { 
      spoilerCount++; // Increment counter
      const parentBackground = element.closest('post-consume-tracker, shreddit-post');

      if (parentBackground && !parentBackground.classList.contains('spoiler-viewed')) {
        const descendants = parentBackground.querySelectorAll('[data-testid="post-title-text" ], [slot="title"], [slot="text-body"], [slot="post-media-container"], [data-testid="search_post_thumbnail"]');

        descendants.forEach(descendant => {
          descendant.style.backgroundColor = "grey";
          descendant.style.color = "grey"; 
          descendant.style.filter = 'blur(8px)';
        });

        if (!parentBackground.querySelector('.view-spoiler-button')) {
          const viewSpoilerButton = document.createElement('button');
          viewSpoilerButton.textContent = 'View Spoiler';
          viewSpoilerButton.className = 'view-spoiler-button';

          viewSpoilerButton.addEventListener('click', function() {
            // Remove the blur and color changes
            descendants.forEach(descendant => {
              descendant.style.backgroundColor = "";
              descendant.style.color = ""; 
              descendant.style.filter = '';
            });

            // Show the upvote and downvote buttons
            upvoteButton.style.display = '';
            downvoteButton.style.display = '';

            // Hide the view spoiler button
            viewSpoilerButton.style.display = 'none';
          });

          const upvoteButton = document.createElement('button');
          upvoteButton.textContent = 'Upvote';
          upvoteButton.className = 'upvote-button';
          upvoteButton.style.backgroundColor = 'green';
          upvoteButton.style.color = 'white';
          upvoteButton.style.border = 'none';
          upvoteButton.style.padding = '5px 10px';
          upvoteButton.style.cursor = 'pointer';
          upvoteButton.style.display = 'none';

          upvoteButton.addEventListener('click', function() {
            const postLink = element.closest('a[data-testid="post-title"]').href;
            votes[postLink].upvotes++;
            console.log(`Upvotes for ${postLink}: ${votes[postLink].upvotes}`);
          });

          const downvoteButton = document.createElement('button');
          downvoteButton.textContent = 'Downvote';
          downvoteButton.className = 'downvote-button';
          downvoteButton.style.backgroundColor = 'red';
          downvoteButton.style.color = 'white';
          downvoteButton.style.border = 'none';
          downvoteButton.style.padding = '5px 10px';
          downvoteButton.style.cursor = 'pointer';
          downvoteButton.style.display = 'none';

          downvoteButton.addEventListener('click', function() {
            const postLink = element.closest('a[data-testid="post-title"]').href;
            votes[postLink].downvotes++;
            console.log(`Downvotes for ${postLink}: ${votes[postLink].downvotes}`);
          });

          // Append the buttons to the parentBackground element
          parentBackground.appendChild(viewSpoilerButton);
          parentBackground.appendChild(upvoteButton);
          parentBackground.appendChild(downvoteButton);
        }
      }
    }
  });

  console.log(`Detected ${spoilerCount} spoilers.`); // Log the total number of spoilers detected
}

checkForSpoilers();
window.addEventListener('scroll', checkForSpoilers);

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.blockSpoilers) {
    blockSpoilers = changes.blockSpoilers.newValue;
  }
});

window.addEventListener('scroll', function() {
  const viewSpoilerButton = document.querySelector('.view-spoiler-button');
  if (viewSpoilerButton) {
    viewSpoilerButton.style.display = 'block';
  }
});

window.addEventListener('scroll', function() {
  const upvoteButton = document.querySelector('.upvote-button');
  const downvoteButton = document.querySelector('.downvote-button');

  if (upvoteButton && downvoteButton) {
    upvoteButton.style.display = 'none';
    downvoteButton.style.display = 'none';
  }
});