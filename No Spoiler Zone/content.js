//content.js 

const marvelWords = ["Iron Man", "Kang", "Captain America", "Thor", "Spider-Man", "Avengers", "Hulk", "No Way Home", "Deadpool", "Godzilla", "Marvel", "Madame", "X-Men", "Fantastic", "This", "The", "it"];
const spoilerKeywords = ["dies", "Dynasty", "killed", "death", "ending", "spoiler", "plot twist", "reveals", "appears", "ends", "cameo", "spoilers", "leak", "spoiler", "Wolverine", "Kong", "Cast", "Web", "97", "Four", "Sony", "a", "is"];

function checkForSpoilers() {
  const elements = document.querySelectorAll('[data-testid="post-title-text"], [slot="title"], [slot="text-body"], [data-post-click-location="text-body"]');

  elements.forEach(element => {
    const elementText = element.textContent.toLowerCase();
    const containsMarvelWord = marvelWords.some(word => elementText.includes(word.toLowerCase()));
    const containsSpoilerKeyword = spoilerKeywords.some(word => elementText.includes(word.toLowerCase()));

    if (containsMarvelWord && containsSpoilerKeyword) { 
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

          const upvoteButton = document.createElement('button');
          upvoteButton.textContent = 'Upvote';
          upvoteButton.style.backgroundColor = 'green';
          upvoteButton.style.color = 'white';
          upvoteButton.style.border = 'none';
          upvoteButton.style.padding = '5px 10px';
          upvoteButton.style.cursor = 'pointer';
          upvoteButton.style.display = 'none';

          const downvoteButton = document.createElement('button');
          downvoteButton.textContent = 'Downvote';
          downvoteButton.style.backgroundColor = 'red';
          downvoteButton.style.color = 'white';
          downvoteButton.style.border = 'none';
          downvoteButton.style.padding = '5px 10px';
          downvoteButton.style.cursor = 'pointer';
          downvoteButton.style.display = 'none';

          const buttonContainer = document.createElement('div');
          buttonContainer.style.display = 'flex';
          buttonContainer.style.justifyContent = 'space-between';
          buttonContainer.style.marginTop = '10px';
          buttonContainer.appendChild(upvoteButton);
          buttonContainer.appendChild(downvoteButton);

          viewSpoilerButton.addEventListener('click', () => {
            descendants.forEach(descendant => {
              descendant.style.backgroundColor = "";
              descendant.style.color = ""; 
              descendant.style.filter = '';
            });

            parentBackground.style.backgroundColor = "";
            parentBackground.style.color = "";
            parentBackground.style.filter = "";
            parentBackground.classList.add('spoiler-viewed');

            upvoteButton.style.display = 'block';
            downvoteButton.style.display = 'block';
          });

          parentBackground.appendChild(viewSpoilerButton);
          parentBackground.appendChild(buttonContainer);
        }
      }
    }
  });
}

checkForSpoilers();
window.addEventListener('scroll', checkForSpoilers);