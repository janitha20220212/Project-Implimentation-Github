//content.js 

const marvelWords = ["Iron Man", "Kang", "Captain America", "Thor", "Spider-Man", "Avengers", "Hulk", "No Way Home", "Deadpool", "Godzilla", "Marvel", "Madame", "X-Men", "Fantastic", "This", "The", "it"];
const spoilerKeywords = ["dies", "Dynasty", "killed", "death", "ending", "spoiler", "plot twist", "reveals", "appears", "ends", "cameo", "spoilers", "leak", "spoiler", "Wolverine", "Kong", "Cast", "Web", "97", "Four", "Sony", "a", "is"];

function checkForSpoilers() {
  const elements = document.querySelectorAll('[data-testid="post-title-text"], [slot="title"], [slot="text-body"]');

  elements.forEach(element => {
    const elementText = element.textContent.toLowerCase();
    const containsMarvelWord = marvelWords.some(word => elementText.includes(word.toLowerCase()));
    const containsSpoilerKeyword = spoilerKeywords.some(word => elementText.includes(word.toLowerCase()));

    if (containsMarvelWord && containsSpoilerKeyword) { 
      const parentBackground = element.closest('post-consume-tracker, shreddit-post');

      if (parentBackground && !parentBackground.classList.contains('spoiler-viewed')) {
        const descendants = parentBackground.querySelectorAll('[data-testid="post-title-text" ], [slot="title"], [slot="text-body"], [slot="post-media-container"]');

        descendants.forEach(descendant => {
          descendant.style.backgroundColor = "grey";
          descendant.style.color = "grey"; 
          descendant.style.filter = 'blur(8px)';
        });

        if (!parentBackground.querySelector('button')) {
          const viewSpoilerButton = document.createElement('button');
          viewSpoilerButton.textContent = 'View Spoiler';
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
          });

          parentBackground.appendChild(viewSpoilerButton);
        }
      }
    }
  });
}

checkForSpoilers();
window.addEventListener('scroll', checkForSpoilers);