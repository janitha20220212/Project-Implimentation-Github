let marvelWords = [
    "Iron Man",
    "Captain America",
    "Thor",
    "Spider-Man",
    "Avengers",
    "Hulk",
    "No Way Home",
];

let spoilerKeywords = [
    "dies",
    "killed",
    "death",
    "ending",
    "spoiler",
    "plot twist",
    "reveals",
    "appears",
    "ends",
    "cameo",
    "spoilers",
    "leak",
    "spoiler",
];

function replaceText(element) {
    if (element.hasChildNodes()) {
        element.childNodes.forEach(replaceText);
    } else if (element.nodeType === Text.TEXT_NODE) {
        let text = element.textContent;
        marvelWords.forEach((marvelWord) => {
            if (text.match(new RegExp("\\b" + marvelWord + "\\b", "gi"))) {
                spoilerKeywords.forEach((keyword) => {
                    if (text.match(new RegExp("\\b" + keyword + "\\b", "gi"))) {
                        //replace the parent element with a black box as overlay
                        element.parentElement.style.display = "inline-block";
                        element.parentElement.style.width = "100%";
                        element.parentElement.style.height = "100%";
                        element.parentElement.style.backgroundColor = "black";
                        element.parentElement.style.color = "black";
                        element.parentElement.style.border = "1px solid black";
                    }
                });
            }
        });
    }
}
// element.textContent = element.textContent.replace(/marvel/gi, "⬛⬛⬛⬛");

replaceText(document.body);
