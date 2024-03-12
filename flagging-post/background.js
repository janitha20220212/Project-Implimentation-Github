



try {
//     // you need to manually have firebase-compat.js file in your dir
  self.importScripts('firebase-compat.js');

  
  var databaseNum = [];

  console.log(databaseNum)
  var count;

  const config = {
    apiKey: "AIzaSyAPERhSJHbCR8UBSSaUDUdixrD27s8Fd1g",
    authDomain: "no-spoiler-zone.firebaseapp.com",
    projectId: "no-spoiler-zone",
    storageBucket: "no-spoiler-zone.appspot.com",
    messagingSenderId: "354259027509",
    appId: "1:354259027509:web:636ecdee2aeaa81409d37c"
  };

  firebase.initializeApp(config);

  var db = firebase.firestore()

  console.log(db)

  const data = {
    TextContent: 'bin'
  };


              

    
  // Getting the position counter 
function countGetter(){

  console.log("Read Count Started");

  return new Promise((resolve) => {
        var data = db.collection('counter').doc('count');
        data.get().then((doc) => {
        if (!doc.exists){
            console.log("No such document for counter");
          }else{
              count = doc.data().count;
              console.log("Successfully retrieved counter: " + count )
            }
        })
        setTimeout(()=>{
          resolve(count)
          console.log("Read Count ended")
        }, 2500)
      })      
    
      
    }


    // Getting the database index for all the content stored
function databaseIndexGetter(count){

        let databaseIndex = []
        for(let i = 1; i<count; i++){
          databaseIndex.push(i)
        }
        return databaseIndex;
   
    

  }
  


async function readData(){
    let count = await countGetter();
    let databaseNum =databaseIndexGetter(count);

    console.log(count)
    console.log(databaseNum)

    console.log("Read Data started")
      var list = [];

      return new Promise((resolve) => {

        for (let i = 0; i< databaseNum.length; i++){
          var data = db.collection('post').doc('details' + databaseNum[i]);
           data.get().then((doc) => {
              if (!doc.exists){
                  console.log("No such document");
              }else{
                let message = doc.data().TextContent;
                list.push(message);
              }
          })
        }      
        
        setTimeout(() => {
          resolve(list)
        console.log("Read Data ended")
        }, 2500);
        
      
      })}


      
  async function addPost(data){
    // Checking if the data is already there in the database
    isAvailable = false;

    let dataContent = await readData();

    console.log(dataContent)

    for (let i = 0; i<dataContent.length; i++){
      if (dataContent[i].includes(data.TextContent) === true){
        isAvailable = true;
      }
    }

    // console.log(data)
    
    // Adding the data if it is not available
    if (isAvailable === false){
      db.collection('post').doc('details' + count).set(data).then(()=> {
        console.log("Document added successfully!")

      });

      databaseNum.push(count);
      count++


      countData = {
        count: count
      }
      console.log(countData)
      
      db.collection('counter').doc('count').set(countData).then(()=> {
        console.log("Counter Updated as well.")
        
      })


    }else{
      console.log("Document is already available");
    }
    
  }
 
    



  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Recieved Message: " + message)
    console.log("From Content Script")
    // let post = {
    //   TextContent: message
    // }

    // console.log(message)

    addPost(message)
    sendResponse("Got it - Background Script")



  });
} catch (e) {
  console.log(e);
}

let initialUrl = "";
let newUrl = "";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
    // console.log("Updated");
    // console.log("Tab ID: ")
    // console.log(tabId);

    // console.log("Change Info: ")
    // console.log(changeInfo);

    // console.log("Tab: ")
    // console.log(tab);
    // chrome.runtime.onMessage.addListener((message, sender, sendResponse)=> {
    //     console.log(message)
    //     console.log(sender)
    //     sendResponse("Hi")
    // })
    

        if (changeInfo.status == "loading"){
            chrome.tabs.sendMessage(
                tab.id,
                tab.url,
                (Response) => {
                    console.log(Response)
                    newUrl = tab.url;
                    console.log("Sent a message! - Loading")
                }
            )
        }
    
        
        if(changeInfo.status == "complete"){
        chrome.tabs.sendMessage(
            tab.id,
            tab.url,
            (Response) => {
                console.log(Response)
                newUrl = tab.url;
                console.log("Sent a message! - completed")
            }
        )
    // if (changeInfo.status == "loading"){
    //     chrome.tabs.sendMessage(
    //         tab.id,
    //         tab.url,
    //         (Response) => {
    //             console.log(Response)
    //             newUrl = tab.url;
    //             console.log("Sent a message! - Loading")
    //         }
    //     )
    // }

    
    // if(changeInfo.status == "complete"){
    // chrome.tabs.sendMessage(
    //     tab.id,
    //     tab.url,
    //     (Response) => {
    //         console.log(Response)
    //         newUrl = tab.url;
    //         console.log("Sent a message! - completed")
    //     }
    // )

    // chrome.scripting.executeScript({
    //     target: {tabId: tabId},
    //     files:['Content.js']
    // });

    // console.log("Sent a message!")
    }
   
})


