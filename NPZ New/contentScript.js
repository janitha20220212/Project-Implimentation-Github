// content.js
let blockSpoilers = true;
let spoilerCount = 0; // Move this to the global scope

chrome.storage.local.get("blockSpoilers", function (data) {
    blockSpoilers = data.blockSpoilers;
});

let postLinks = Array.from(
    document.querySelectorAll('a[data-testid="post-title"]')
).map((a) => a.href);
console.log(postLinks);
// Initialize the votes object
const votes = {};

// Add event listeners to track upvotes and downvotes
postLinks.forEach((postLink, index) => {
    const upvoteButtons = document.querySelectorAll(".upvote-button");
    const downvoteButtons = document.querySelectorAll(".downvote-button");

    // Initialize the votes object
    const votes = {};

    // Create the upvote and downvote buttons
    const upvoteButton = document.createElement("button");
    upvoteButton.textContent = "Upvote";
    upvoteButton.className = `upvote-button-${index}`; // Assign a unique class

    const downvoteButton = document.createElement("button");
    downvoteButton.textContent = "Downvote";
    downvoteButton.className = `downvote-button-${index}`; // Assign a unique class

    // ...
    // Function to log the vote counts
    function logVoteCounts() {
        console.log(votes);
    }

    // Add event listeners to track upvotes and downvotes
    postLinks.forEach((postLink, index) => {
        const postElement = document.querySelector(`a[href="${postLink}"]`);
        if (postElement) {
            const upvoteButton = document.createElement("button");
            upvoteButton.textContent = "Upvote";
            upvoteButton.className = `upvote-button-${index}`; // Assign a unique class

            const downvoteButton = document.createElement("button");
            downvoteButton.textContent = "Downvote";
            downvoteButton.className = `downvote-button-${index}`; // Assign a unique class

            postElement.parentNode.appendChild(upvoteButton);
            postElement.parentNode.appendChild(downvoteButton);

            upvoteButton.addEventListener("click", function () {
                if (!votes[postLink]) {
                    votes[postLink] = { upvotes: 0, downvotes: 0 };
                }
                votes[postLink].upvotes++;
                logVoteCounts();
                // Send the updated votes object to the database
                // replace 'yourDatabaseFunction' with your actual function to send data to the database
                yourDatabaseFunction(votes);
            });

            downvoteButton.addEventListener("click", function () {
                if (!votes[postLink]) {
                    votes[postLink] = { upvotes: 0, downvotes: 0 };
                }
                votes[postLink].downvotes++;
                logVoteCounts();
                // Send the updated votes object to the database
                // replace 'yourDatabaseFunction' with your actual function to send data to the database
                yourDatabaseFunction(votes);
            });
        }
    });
});

function fetchModel(totalContent, postUniqueLink, elements) {
    containsSpoiler = false;
    var post = {
        text: totalContent,
        link: postUniqueLink,
    };
    // fetch("https://nospoilerzone.azurewebsites.net/aidetection/", {
    fetch("http://127.0.0.1:5000/aidetection/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    })
        .then((response) => response.json())
        .then((data) => {
            containsSpoiler = data; // Extract label from the response
            console.log("contain spoiler return" + containsSpoiler);

            if (containsSpoiler == "1") {
                console.log("Contains spoiler in if");
                containsSpoiler = true;
                hideSpoilerPosts(elements);
            } else if (containsSpoiler == "0") {
                containsSpoiler = false;
                console.log("not spoiler in if");
            } else if (containsSpoiler == "Text is too long.") {
                containsSpoiler = false;
                console.log("Text is too long");
            } else {
                containsSpoiler = false;
                console.log("Error in the fetch");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            console.log("Error in the fetch");
        });

    console.log("fetch method Contains spoiler: " + containsSpoiler);

    return containsSpoiler;
}
async function checkForSpoilers() {
    spoilerCount = 0; // Reset the counter
    const elements = document.querySelectorAll(
        '[data-testid="post-title-text"], [slot="title"], [slot="text-body"], [data-post-click-location="text-body"]'
    );

    let postUniqueLink = Array.from(
        document.querySelectorAll('a[data-testid="post-title"]')
    ).map((a) => a.href);

    console.log(document.querySelectorAll('[data-testid="post-title-text"]'));

    console.log(document.querySelectorAll('[slot="text-body"]'));

    console.log(
        document.querySelectorAll('[data-post-click-location="text-body"]')
    );

    let totalContent = "";

    elements.forEach((element) => {
        totalContent += element.textContent;
    });

    console.log("Total Content: " + totalContent);
    let containsSpoiler = false;

    console.log("fetch started" + containsSpoiler);

    containsSpoiler = await fetchModel(totalContent, postUniqueLink, elements);

    console.log("fetch finished" + containsSpoiler);

    console.log("Contains spoiler: " + containsSpoiler);

    if (containsSpoiler) {
        spoilerCount++; // Increment counter
        const parentBackground = element.closest(
            "post-consume-tracker, shreddit-post"
        );

        if (
            parentBackground &&
            !parentBackground.classList.contains("spoiler-viewed")
        ) {
            const descendants = parentBackground.querySelectorAll(
                '[data-testid="post-title-text" ], [slot="title"], [slot="text-body"], [slot="post-media-container"], [data-testid="search_post_thumbnail"]'
            );

            descendants.forEach((descendant) => {
                descendant.style.backgroundColor = "grey";
                descendant.style.color = "grey";
                descendant.style.filter = "blur(8px)";
            });

            if (!parentBackground.querySelector(".view-spoiler-button")) {
                const viewSpoilerButton = document.createElement("button");
                viewSpoilerButton.textContent = "View Spoiler";
                viewSpoilerButton.className = "view-spoiler-button";

                const upvoteButton = document.createElement("button");
                upvoteButton.textContent = "Upvote";
                upvoteButton.style.backgroundColor = "green";
                upvoteButton.style.color = "white";
                upvoteButton.style.border = "none";
                upvoteButton.style.padding = "5px 10px";
                upvoteButton.style.cursor = "pointer";
                upvoteButton.style.display = "none";

                const downvoteButton = document.createElement("button");
                downvoteButton.textContent = "Downvote";
                downvoteButton.style.backgroundColor = "red";
                downvoteButton.style.color = "white";
                downvoteButton.style.border = "none";
                downvoteButton.style.padding = "5px 10px";
                downvoteButton.style.cursor = "pointer";
                downvoteButton.style.display = "none";

                viewSpoilerButton.addEventListener("click", function () {
                    // Remove the blur and color changes
                    descendants.forEach((descendant) => {
                        descendant.style.backgroundColor = "";
                        descendant.style.color = "";
                        descendant.style.filter = "";
                    });

                    // Show the upvote and downvote buttons
                    upvoteButton.style.display = "";
                    downvoteButton.style.display = "";

                    // Hide the view spoiler button
                    viewSpoilerButton.style.display = "none";
                });

                // Append the buttons to the parentBackground element
                parentBackground.appendChild(viewSpoilerButton);
                parentBackground.appendChild(upvoteButton);
                parentBackground.appendChild(downvoteButton);
            }
        }
    }
}

function hideSpoilerPosts(elements) {
    containsSpoiler = true;
    if (containsSpoiler) {
        spoilerCount++; // Increment counter
        const parentBackground = element.closest(
            "post-consume-tracker, shreddit-post"
        );

        if (
            parentBackground &&
            !parentBackground.classList.contains("spoiler-viewed")
        ) {
            const descendants = parentBackground.querySelectorAll(
                '[data-testid="post-title-text" ], [slot="title"], [slot="text-body"], [slot="post-media-container"], [data-testid="search_post_thumbnail"]'
            );

            descendants.forEach((descendant) => {
                descendant.style.backgroundColor = "grey";
                descendant.style.color = "grey";
                descendant.style.filter = "blur(8px)";
            });

            if (!parentBackground.querySelector(".view-spoiler-button")) {
                const viewSpoilerButton = document.createElement("button");
                viewSpoilerButton.textContent = "View Spoiler";
                viewSpoilerButton.className = "view-spoiler-button";

                const upvoteButton = document.createElement("button");
                upvoteButton.textContent = "Upvote";
                upvoteButton.style.backgroundColor = "green";
                upvoteButton.style.color = "white";
                upvoteButton.style.border = "none";
                upvoteButton.style.padding = "5px 10px";
                upvoteButton.style.cursor = "pointer";
                upvoteButton.style.display = "none";

                const downvoteButton = document.createElement("button");
                downvoteButton.textContent = "Downvote";
                downvoteButton.style.backgroundColor = "red";
                downvoteButton.style.color = "white";
                downvoteButton.style.border = "none";
                downvoteButton.style.padding = "5px 10px";
                downvoteButton.style.cursor = "pointer";
                downvoteButton.style.display = "none";

                viewSpoilerButton.addEventListener("click", function () {
                    // Remove the blur and color changes
                    descendants.forEach((descendant) => {
                        descendant.style.backgroundColor = "";
                        descendant.style.color = "";
                        descendant.style.filter = "";
                    });

                    // Show the upvote and downvote buttons
                    upvoteButton.style.display = "";
                    downvoteButton.style.display = "";

                    // Hide the view spoiler button
                    viewSpoilerButton.style.display = "none";
                });

                // Append the buttons to the parentBackground element
                parentBackground.appendChild(viewSpoilerButton);
                parentBackground.appendChild(upvoteButton);
                parentBackground.appendChild(downvoteButton);
            }
        }
    }
}

console.log(`Detected ${spoilerCount} spoilers.`); // Log the total number of spoilers detected

chrome.storage.local.get("blockSpoilers", function (data) {
    if (data.blockSpoilers) {
        checkForSpoilers();
    }
});

// Create a MutationObserver instance
const observer = new MutationObserver(checkForSpoilers);

// Start observing the document with the configured parameters
observer.observe(document, { childList: true, subtree: true });

chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (changes.blockSpoilers) {
        blockSpoilers = changes.blockSpoilers.newValue;
    }
});

window.addEventListener("scroll", function () {
    const viewSpoilerButton = document.querySelector(".view-spoiler-button");
    if (viewSpoilerButton) {
        viewSpoilerButton.style.display = "block";
    }
});

window.addEventListener("scroll", function () {
    const upvoteButton = document.querySelector(".upvote-button");
    const downvoteButton = document.querySelector(".downvote-button");

    if (upvoteButton && downvoteButton) {
        upvoteButton.style.display = "none";
        downvoteButton.style.display = "none";
    }
});

// Send the spoiler count to the background script
chrome.runtime.sendMessage({ action: "updateBadge", count: spoilerCount });

// window.addEventListener("scroll", function () {
//     postLinks = Array.from(
//         document.querySelectorAll('a[data-testid="post-title"]')
//     ).map((a) => a.href);
//     console.log(postLinks);
// });

// Flagging Post feature

// Adds flag post button in the home page
function flagHomePosts() {
    let posts = document.getElementsByTagName("a");
    let post = document.getElementsByTagName("span");

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].slot.includes("full-post-link")) {
            posts[i].slot = "full-post";
            console.log("Added a button");
            posts[i].insertAdjacentHTML(
                "afterend",
                "<button class='flag' style='transform: translate(290px, 32px)'>Flag Post<button/>"
            );
        }
    }

    //
}

function getData(et) {
    console.log("Get data is running");
    let button = et.target;
    let text;
    let heading;
    let link;
    try {
        text = text = button.parentElement.children[5].textContent.trim();
        heading = button.parentElement.children[3].textContent.trim();
        link = button.parentElement.children[3].href;
    } catch (error) {
        console.log("There was an error for heading button access");
        text = document
            .getElementsByTagName("h1")[0]
            .parentElement.children[3].textContent.trim();
        heading = document.getElementsByTagName("h1")[0].textContent.trim();
        link = document
            .getElementsByTagName("h1")[0]
            .parentElement.getAttribute("content-href");
    }

    let post = {
        Heading: heading.trim(),
        TextContent: text.trim(),
        link: link,
    };

    chrome.runtime.sendMessage(post, (response) => {
        console.log(response);
    });
}

// function executeFun(btn){
//     getData(btn)
// }

let idList = [];
function addClickEvent() {
    let btns = document.getElementsByClassName("flag");

    for (let i = 0; i < btns.length; i++) {
        if (btns[i].id == "") {
            btns[i].id = "" + i;
            btns[i].addEventListener("click", (event) => getData(event));
        }
    }
}

// function addClicker(){
//     let btns = document.getElementsByClassName("flag")

//     for (let i = 0; i< btns.length; i++){
//         if (!idList.includes(btns[i].id) && btns[i].id.includes(i)){
//             idList.push(i);
//             btns[i].addEventListener("click", () => executeFun(btns[i]))
//         }

//     }
// }

// Adds flag post button to individual posts when clicked on them

// to make sure only one button is added to the page
let executed = false;

function flagIndividualPosts() {
    let post = document.getElementsByTagName("span");

    for (let i = 0; i < post.length; i++) {
        if (post[i].innerText.includes("Sort")) {
            post[i].innerText = "sort by: ";
            executed = true;
            console.log("Added a button");
            post[i].insertAdjacentHTML(
                "afterend",
                "<button class='flag' style='transform: translate(290px, -61px)'>Flag Post<button/>"
            );
        }
    }
}

// Removing the empty button on top of the flag post button
function removeEmptyButton() {
    let button4 = document.getElementsByTagName("button");

    for (let y = 0; y < button4.length; y++) {
        if (button4[y].innerText === "") {
            button4[y].remove();
        }
    }
}

// dynamically adds Flag Post button
setInterval(flagHomePosts, 2000);
// setInterval(checkForSpoilers, 2000);
setInterval(addClickEvent, 20);
// setInterval(addClicker, 200);
setInterval(flagIndividualPosts, 20);
setInterval(removeEmptyButton, 20);

// Get post text

// let list = [];

// function getPostText(){
//   const elementsText = document.querySelectorAll('[slot="text-body"]');
//   const elementsHeading = document.querySelectorAll('[slot="text-body"]');

//   elementsText.forEach(element => {
//       const elementText = element.textContent;

//       if (!list.includes(elementText.trim())){
//           list.push(elementText);
//       }

//   })

//   elementsText.forEach(element => {
//       const elementText = element.textContent;

//       if (!list.includes(elementText.trim())){
//           list.push(elementText.trim());
//       }

//   })

//   list.forEach((text1)=> {console.log(text1)})
// }

// getPostText();
