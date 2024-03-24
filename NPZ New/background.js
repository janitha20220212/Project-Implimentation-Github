// background.js
let spoilerCount = 0;

chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["contentScript.js"],
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateBadge") {
        spoilerCount = request.count;
        chrome.browserAction.setBadgeText({ text: request.count.toString() });
    } else if (request.action === "getSpoilerCount") {
        sendResponse({ count: spoilerCount });
    }
    return true; // This ensures the sendResponse callback is kept alive for asynchronous use
});

function updateIcon() {
    if (isExtensionEnabled()) {
        chrome.browserAction.setIcon({path: 'npznew_enabled.png'});
    } else {
        chrome.browserAction.setIcon({path: 'npznew.png'});
    }
}

// FLAG POST Background Script Code

try {
    // Importing the firebase configuration file to work with firestore
    self.importScripts("firebase-compat.js");

    var databaseNum = [];

    console.log(databaseNum);
    var count;

    // Initialising the firebase using the firestore credentials
    const config = {
        apiKey: "AIzaSyAPERhSJHbCR8UBSSaUDUdixrD27s8Fd1g",
        authDomain: "no-spoiler-zone.firebaseapp.com",
        projectId: "no-spoiler-zone",
        storageBucket: "no-spoiler-zone.appspot.com",
        messagingSenderId: "354259027509",
        appId: "1:354259027509:web:636ecdee2aeaa81409d37c",
    };

    firebase.initializeApp(config);

    var db = firebase.firestore();

    console.log(db);

    const data = {
        TextContent: "bin",
    };

    // GETTING THE POSITION COUNTER WHERE THE NEXT DETAIL IS TO BE STORED
    function countGetter() {
        console.log("Read Count Started");

        return new Promise((resolve) => {

            // Accessing the database using the collection and document name
            var data = db.collection("counter").doc("count");
            data.get().then((doc) => {

                
                if (!doc.exists) {
                    //  if document does not exist
                    console.log("No such document for counter");
                } else {

                    // if the document exists
                    count = doc.data().count;
                    console.log("Successfully retrieved counter: " + count);
                }
            });

            // Few seconds to access the data from the database
            setTimeout(() => {
                resolve(count);
                console.log("Read Count ended");
            }, 2500);
        });
    }

    // GETTING THE DATABASE INDEXES OF THE POST DETAILS ALREADY STORED (Naming convention for posts: details + index)
    function databaseIndexGetter(count) {
        let databaseIndex = [];
        for (let i = 1; i < count; i++) {
            databaseIndex.push(i);
        }
        return databaseIndex;
    }

    // READING THE DATA ALREADY STORED ON THE DATABASE TO MAKE SURE WHETHER THE NEW POST DETAILS IS ALREADY STORED OR NOT
    async function readData() {
        // getting the count
        let count = await countGetter();
        console.log(count);

        // getting the post indexes
        let databaseNum = databaseIndexGetter(count);

        console.log(count);
        console.log(databaseNum);

        console.log("Read Data started");
        var list = [];

        return new Promise((resolve) => {

            // looping through the database indexes to correctly identify each individual post details stored
            for (let i = 0; i < databaseNum.length; i++) {
                var data = db
                    .collection("post")
                    .doc("details" + databaseNum[i]);


                data.get().then((doc) => {
                    if (!doc.exists) {

                        // if document doesn't exist
                        console.log("No such document");
                    } else {
                        // if the document exists
                        let message = doc.data().TextContent;
                        list.push(message);
                    }
                });
            }

            // Time delay to access the data from the database
            setTimeout(() => {
                console.log("Read Data ended");
                console.log(list);
                resolve(list);
            }, 2500);
        });
    }

    // ADDING THE POST TO THE DATABASE
    async function addPost(data) {
        // To Check if the data is already there in the database
        isAvailable = false;
        console.log("INSIDE Add Post");

        // reading the data already stored in the database
        let dataContent = await readData();

        console.log("next up is dataContent");

        console.log(dataContent);

        // looping through the data and checking if it contains the text of the new details to be stored.
        for (let i = 0; i < dataContent.length; i++) {
            if (dataContent[i].includes(data.TextContent) === true) {
                isAvailable = true;
                // updateIcon();
            }
        }

        // Adding the data if it is not available
        if (isAvailable === false) {

            // accessing and storing the details to the database using the collection and document name
            db.collection("post")
                .doc("details" + count)
                .set(data)
                .then(() => {
                    console.log("Document added successfully!");
                });

            // adding the count to the database indexes since this position has a new detail 
            databaseNum.push(count);

            // incrementing the count by 1 to point to the next position where data is to be stored
            count++;

            // storing the count in an object
            countData = {
                count: count,
            };
            console.log(countData);

            // storing the count in the database
            db.collection("counter")
                .doc("count")
                .set(countData)
                .then(() => {
                    console.log("Counter Updated as well.");
                });

            // sending flagpost result to the content script if it was added successfully
                sendDatabaseResult("Post has been flagged")

        } else {
            console.log("Document is already available");

            // sending flagpost result to the content script if it is already available
            sendDatabaseResult("Post is already available in flagged list")

        }
    }

    // RECEIVING THE MESSAGE FROM CONTENT SCRIPT
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log("Recieved Message: " + message);
        console.log("From Content Script");

        
        try {
            // If the message was not the intented one (earlier message from other functionalities)
            if (message.action.includes("updateBadge")) {
                console.log("data contains action attribute");
            }
        } catch (error) {
            // If the message is relevant for flag post
            if (message.TextContent != undefined){
                console.log(message)
                addPost(message);

            }
        }

        sendResponse("Got it - Background Script");
    });
} catch (e) {
    console.log(e);
}

// SENDS THE RESULT OF THE FLAG POST TO THE CONTENT SCRIPT TO ALERT THE USER
function sendDatabaseResult(message){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
    var activeTab = tabs[0]
    console.log(activeTab)
    chrome.tabs.sendMessage(activeTab.id, {msg: message}, function(r){
        console.log(r)
    })
})
}

