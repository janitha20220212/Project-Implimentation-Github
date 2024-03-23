// // popup.js
// let isEnabled = true;

// document.getElementById('toggleButton').addEventListener('click', function() {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {command: "toggle"}, function(response) {
//       if (response.result === "success") {
//         isEnabled = !isEnabled;
//         document.getElementById('toggleButton').textContent = isEnabled ? 'Disable' : 'Enable';
//       }
//     });
//   });
// });

// document.querySelector('.switch').addEventListener('click', function() {
//   let container = document.querySelector('.container');
//   container.style.background = 'rgba(29, 31, 32, 0.904) radial-gradient(rgba(255, 0, 0, 0.712) 10%, transparent 1%)';
//   container.style.backgroundSize = '11px 11px';
// });

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if (request.spoilerCount) {
//       document.getElementById('spoilerCount').textContent = request.spoilerCount;
//     }
//   }
// );

// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementById('settingsButton').addEventListener('click', function() {
//     document.getElementById('mainSection').style.display = 'none';
//     document.getElementById('settingsSection').style.display = 'block';
//   });

//   document.getElementById('backButton').addEventListener('click', function() {
//     document.getElementById('settingsSection').style.display = 'none';
//     document.getElementById('mainSection').style.display = 'block';
//   });

//   document.getElementById('publicProfileButton').addEventListener('click', function() {
//     // Navigate to the public profile UI
//   });

//   document.getElementById('accountButton').addEventListener('click', function() {
//     // Navigate to the account UI
//   });
// });

// document.getElementById('themeSwitch').addEventListener('change', function() {
//   document.body.classList.toggle('dark-mode', this.checked);
//   document.body.classList.toggle('light-mode', !this.checked);
// });

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if (request.spoilerCount) {
//       document.getElementById('spoilerCount').textContent = request.spoilerCount;
//     }
//   }
// );
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if (request.spoilerCount) {
//       updateSpoilerCount(request.spoilerCount);
//     }
//   }
// );

// function updateSpoilerCount(count) {
//   const spoilerCount = document.getElementById("spoilerCount");
//   spoilerCount.textContent = count;
// }

// // popup.js
// const themeSwitch = document.querySelector('.switch');

// themeSwitch.addEventListener('change', function() {
//   chrome.storage.local.set({blockSpoilers: !this.checked});
// });

// // Rest of your code...

// popup.js or options.js
// Get the span element by its id
const spoilerCount = document.getElementById("spoilerCount");

// Function to update the spoiler count
function updateSpoilerCount(count) {
    spoilerCount.textContent = count;
}

// Example usage: Call the updateSpoilerCount function with the desired count
updateSpoilerCount(500); // Replace 5 with the actual count of detected spoilers

document.addEventListener("DOMContentLoaded", function () {
    chrome.runtime.sendMessage(
        { action: "getSpoilerCount" },
        function (response) {
            document.getElementById("spoilerCount").textContent =
                response.count;
        }
    );
});

// document.addEventListener("click", async function () {
//     try {
//         let response = await fetch(
//             "https://nospoilerzone.azurewebsites.net/turnonoffgemini/",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 // body: JSON.stringify(post),
//             }
//         );

//         let data = await response.text(); // Changed this line

//         console.log(data);
//         if (data == "True") {
//             console.log("extension is running");
//         } else {
//             console.log("extension is not running");
//         }
//     } catch (error) {
//         console.error("Error:" + error);
//     }
// });
