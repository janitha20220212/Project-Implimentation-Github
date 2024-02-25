//content.js 

const marvelWords = ["Iron Man", "Kang", "Captain America", "Thor", "Spider-Man", "Avengers", "Hulk", "No Way Home", "Deadpool", "Godzilla", "Marvel", "Madame", "X-Men", "Fantastic"];
const spoilerKeywords = ["dies", "Dynasty", "killed", "death", "ending", "spoiler", "plot twist", "reveals", "appears", "ends", "cameo", "spoilers", "leak", "spoiler", "Wolverine", "Kong", "Cast", "Web", "97", "Four", "Sony"];

function checkForSpoilers() {
  const elements = document.querySelectorAll('[data-adclicklocation="title"], [data-click-id="text"]');

  elements.forEach(element => {
    const elementText = element.textContent.toLowerCase();
    const containsMarvelWord = marvelWords.some(word => elementText.includes(word.toLowerCase()));
    const containsSpoilerKeyword = spoilerKeywords.some(word => elementText.includes(word.toLowerCase()));

    if (containsMarvelWord && containsSpoilerKeyword) { 
      //element.style.backgroundColor = "black";
      //element.style.color = "black";

      // Find the parent element with data-adclicklocation="background"
      const parentBackground = element.closest('[data-adclicklocation="background"]');

      // If found, apply the same style to it
      if (parentBackground) {

        // Check if it has a descendant with data-adclicklocation="title" or data-click-id="text" or data-adclicklocation="media"
        const descendants = parentBackground.querySelectorAll('[data-adclicklocation="title"], [data-click-id="text"], [data-adclicklocation="media"]');

        // Apply the same style to them
        descendants.forEach(descendant => {
          descendant.style.backgroundColor = "black";
          descendant.style.color = "black"; 

          const g11 = descendant.querySelectorAll('h3, p, a, div, span');
          g11.forEach(mediaDescendant => {
            mediaDescendant.style.backgroundColor = "black";
            mediaDescendant.style.color = "black"; 
          });

          if (descendant.getAttribute('role') === 'img') {
            // Apply a blur effect to the background image
            descendant.style.filter = 'blur(15px)';
          }
          const mediaDescendants = descendant.querySelectorAll('div img, iframe');
          mediaDescendants.forEach(mediaDescendant => {
            mediaDescendant.style.filter = "blur(15px)";
          });

        });
      }
    }
  });
}

// Run the function when the page loads
checkForSpoilers();

// Run the function when the user scrolls the page
window.addEventListener('scroll', checkForSpoilers);  
