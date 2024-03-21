const marvelWords = ["Iron Man", "Kang", "Captain America", "Thor", "Spider-Man", "Avengers", "Hulk", "No Way Home", "Deadpool", "Godzilla", "Marvel", "Madame", "X-Men", "Fantastic", "This", "The", "it"];
const spoilerKeywords = ["dies", "Dynasty", "killed", "death", "ending", "spoiler", "plot twist", "reveals", "appears", "ends", "cameo", "spoilers", "leak", "spoiler", "Wolverine", "Kong", "Cast", "Web", "97", "Four", "Sony", "a", "is"];


export function checkForSpoilers() { 
    
    const elements = document.querySelectorAll('[data-testid="post-title-text"], [slot="title"], [slot="text-body"], [data-post-click-location="text-body"]');
    let spoilerDetected = false;
    let blurApplied = false;

    elements.forEach(element => {
        const elementText = element.textContent.toLowerCase();
        const containsMarvelWord = marvelWords.some(word => elementText.includes(word.toLowerCase()));
        const containsSpoilerKeyword = spoilerKeywords.some(word => elementText.includes(word.toLowerCase()));

        if (containsMarvelWord && containsSpoilerKeyword) {
            spoilerDetected = true;
            const parentBackground = element.closest('post-consume-tracker, shreddit-post');
            const descendants = parentBackground.querySelectorAll('[data-testid="post-title-text" ], [slot="title"], [slot="text-body"], [slot="post-media-container"], [data-testid="search_post_thumbnail"]');

            descendants.forEach(descendant => {
                descendant.style.backgroundColor = "grey";
                descendant.style.color = "grey";
                descendant.style.filter = 'blur(8px)';
                blurApplied = true;
            });
        }
    });

    /*if (spoilerDetected) {
        console.log('Spoiler post detected.');
    } else {
        console.log('No spoiler post detected.');
    }

    if (blurApplied) {
        console.log('Blur effect successfully applied.');
    } else {
        console.log('Blur effect not applied.');
    }*/

    if (spoilerDetected && blurApplied) {
        return 'Successfull';
    } else {
        return 'Failed';
    }
} 