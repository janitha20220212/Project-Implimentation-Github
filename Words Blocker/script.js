replaceText(document.body) 

function replaceText(element) {
    if (element.hasChildNodes()) {
      element.childNodes.forEach(replaceText)
    } else if (element.nodeType === Text.TEXT_NODE) { 
        if(element.textContent.match(/marvel/gi)) { 

            //Give animated rainbow colours to every word that says 'marvel'
            /*const newElement = document.createElement('span')
            newElement.innerHTML = element.textContent.replace(/(marvel)/gi, '<span class="rainbow">$1</span>') 
            element.replaceWith(newElement)*/

           
           //Removes the whole pharagraph which includes the word 'marvel'
           /*element.parentElement.remove()*/

           //Covers the word 'marvel' with black (rectangle box)
            /*const newElement = document.createElement('span')
            newElement.innerHTML = element.textContent.replace(/(marvel)/gi, 
            '<span style="background-color: black; color: black;">$1</span>') 
            element.replaceWith(newElement)*/

            //Covers whole pharagraph with black which includes the word 'marvel'
            /*element.parentElement.style.color = 'black' 
            element.parentElement.style.backgroundColor = 'black'*/
        }
        //Replace the word 'marvel' with '⬛⬛⬛⬛'
        element.textContent = element.textContent.replace(/marvel/gi, '⬛⬛⬛⬛')
    }
}
