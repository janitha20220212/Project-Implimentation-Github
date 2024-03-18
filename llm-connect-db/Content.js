// chrome.runtime.sendMessage("This is the message", (response)=>{
//     console.log(response)
// })

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
    let button = et.target;
    let text;
    let heading;
    let link;
    let label;
    try {
        text = text = button.parentElement.lastElementChild.textContent.trim();
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

    fetch("https://nospoilerzone.azurewebsites.net/aidetection/", {
        // fetch("http://127.0.0.1:5000/aidetection/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
    })
        .then((response) => response.json())
        .then((data) => {
            label = data; // Extract label from the response
            let post = {
                Heading: heading.trim(),
                TextContent: text.trim(),
                link: link,
                label: label,
            };

            chrome.runtime.sendMessage(post, (response) => {
                console.log("success");
                console.log(response);
            });
        })
        .catch((error) => {
            console.error("Error:", error);
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
            // span[i].insertAdjacentHTML("afterend", button2);
            // let button4 = document.getElementsByTagName("button");

            // for (let y = 0; i< button4.length; i++){
            //     if (button4[i].innerText === ""){
            //         console.log(button4[i])
            //     }
            // }
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
setInterval(addClickEvent, 20);
// setInterval(addClicker, 200);
setInterval(flagIndividualPosts, 20);
setInterval(removeEmptyButton, 20);

// Get post text

let list = [];

function getPostText() {
    // let container = document.getElementsByClassName("mb-xs");

    // let text = "";

    // for (let i = 0; i< container.length; i++){
    //e     if (!container[i].slot.includes("post-media-container")){

    //         let paraContainer = container[i].getElementsByTagName('p')

    //         for (let y = 0; y< paraContainer.length; y++){
    //             try {
    //                 text += container[i].getElementsByTagName('p')[y].textContent;
    //             } catch (error) {
    //                 console.log("Not successful");
    //             }

    //         }

    //         container[i]
    //         break;
    //     }
    // }

    // '[data-testid="post-title-text"],

    const elementsText = document.querySelectorAll('[slot="text-body"]');
    const elementsHeading = document.querySelectorAll('[slot="text-body"]');

    elementsText.forEach((element) => {
        const elementText = element.textContent;

        if (!list.includes(elementText.trim())) {
            list.push(elementText);
        }
    });

    elementsText.forEach((element) => {
        const elementText = element.textContent;

        if (!list.includes(elementText.trim())) {
            list.push(elementText.trim());
        }
    });

    list.forEach((text1) => {
        console.log(text1);
    });
}

getPostText();
