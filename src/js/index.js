////////////////////////
//VARIABLES
////////////////////////
const allCodeSnippets = document.querySelectorAll('.code-snippet'); //get all code snippets as a node list
const navInformationButton = document.getElementById('nav-information-button');
const navInformationMenu = document.getElementById('nav-information-menu');

////////////////////////
//FUNCTIONS
////////////////////////


//** VIEW FUNCTIONS */

//Function to toggle copied class on button
function toggleCopiedClass(copyButton) {
    const codeToCopy = copyButton.closest('.code-snippet__snippet').querySelector('CODE').innerHTML; //select the code snippet
    navigator.clipboard.writeText(codeToCopy); //write the code snippet to the clipboard
    copyButton.querySelector('.button__primary--copied').classList.add('show'); //add the show class to the button
    setTimeout(() => { // setTimeout to remove the show class after 800ms
        copyButton.querySelector('.button__primary--copied').classList.remove('show'); //remove the show class to the button
    }, 800);
};

//Function to collapse a code snippet
function collapseSnippet(twisty, content) {
    twisty.classList.remove('expanded'); // remove class expanded
    content.classList.remove('show'); // remove class show
    return;
}

//function to expand a code snippet
function expandSnippet(twisty, content) {
    twisty.classList.add('expanded'); // add class expanded
    content.classList.add('show'); // add class show
}

//Function to toggle collapse/expand of a code snippet
function collapseCodeSnippet(snippet) {
    const codeSnippetTwisty = snippet.closest('.code-snippet').querySelector('.code-snippet__control'); //get the twisty element
    const codeSnippetContent = snippet.closest('.code-snippet').querySelector('.code-snippet__content'); //get the content element
    if(codeSnippetTwisty.classList.contains('expanded')) { // check if the twisty has the expanded clast or not
        collapseSnippet(codeSnippetTwisty, codeSnippetContent);
        return;
    }
    expandSnippet(codeSnippetTwisty, codeSnippetContent);
    return;
};

//Function to collapse all code snippets that are open
function collapseAllCodeSnippets() {
    allCodeSnippets.forEach((snippet) => {
        const codeSnippetContent = snippet.closest('.code-snippet').querySelector('.code-snippet__content'); //get the twisty element
        const codeSnippetTwisty = snippet.closest('.code-snippet').querySelector('.code-snippet__control'); //get the content element
        if(codeSnippetTwisty.classList.contains('expanded')) { // check if the twisty has the expanded clast or not
            collapseSnippet(codeSnippetTwisty, codeSnippetContent);
            return;
        }
    })
};

// Function to update the UI counter within a snippet
function setUICounter(number, snippet) {
    let snippetCounter;
    if(snippet.classList.contains('copy-button')) { //check if a button was passed
        snippetCounter = snippet.closest('.code-snippet__snippet-control').querySelector('.code-snippet__snippet-counter'); // get the number counter in the snippet
    } else { //otherwise you get the whole snippet
        snippetCounter = snippet.querySelector('.code-snippet__snippet-control').querySelector('.code-snippet__snippet-counter'); // get the number counter in the snippet
    }

    if(number){ //check if the number exists
        snippetCounter.innerHTML = number; //set inner html of element to amount
        return;
    }
    snippetCounter.innerHTML = 0; //set inner html of element to zero
    return
    
}

//** MODEL FUNCTIONS */

//Function to read from localStorage and set counters for snippets in the UI
function setSnippets() {
    let codeSnippetsLocalStorage = localStorage.getItem('snippets'); // get the localStorage
    if(!codeSnippetsLocalStorage) { // if there is no localStorage then return out of function
        return;
    }
    codeSnippetsLocalStorage = JSON.parse(codeSnippetsLocalStorage); // if it does exists then parse the contents
    allCodeSnippets.forEach((snippet) => {
        const snippetId = snippet.querySelector('.code-snippet__code').querySelector('CODE').dataset.id; //get the unique snippet id
        // console.log(snippetId);
        for (const [key, value] of Object.entries(codeSnippetsLocalStorage)) {
            if(snippetId === key) {
                setUICounter(value, snippet);
                return;
            }
            setUICounter(0, snippet);
        }
    });
};

//Function to write to localStorage when there is a button click
function writeToLocalStorage(copySnippet) {
    // console.log(copySnippet);
    const snippetId = copySnippet.closest('.code-snippet__snippet').querySelector('CODE').dataset.id; //get the unique snippet id
    let codeSnippetsLocalStorage = localStorage.getItem('snippets'); // get the localStorage
    if(codeSnippetsLocalStorage){ //check if local storage exists
        codeSnippetsLocalStorage = JSON.parse(codeSnippetsLocalStorage); // if it does exists then parse the contents
    } else {
        codeSnippetsLocalStorage = {};  //if it does not set it to an object
    }
    if(codeSnippetsLocalStorage[snippetId]) { //check if this snippet has been added to the object yet
        let amount = parseInt(codeSnippetsLocalStorage[snippetId]); // get value and set as a number
        amount ++; // increment the value by 1
        codeSnippetsLocalStorage[snippetId] = amount; //set the number in local storage back to the new incremented amount
        setUICounter(amount, copySnippet);//update UI
    } else {
        codeSnippetsLocalStorage[snippetId] = 1; //add snippet with unique id to the object and set its value to 1
        setUICounter(1, copySnippet);//update UI
    }
    localStorage.setItem('snippets', JSON.stringify(codeSnippetsLocalStorage)); //set the updated localstorage object back to localstorage
};

//Function to rest local storage
function resetLocalStorage() {
    let codeSnippetsLocalStorage = localStorage.getItem('snippets'); // get the localStorage
    if(codeSnippetsLocalStorage) {
        localStorage.setItem('snippets', JSON.stringify({})); //set the updated localstorage object back to localstorage
        return;
    }
    return;
}



////////////////////////
//EVENT LISTENERS
////////////////////////

//call script upon page load
window.addEventListener('load', (e) => {
    // console.log(localStorage);
});

window.addEventListener('DOMContentLoaded', (e) => {
    // console.log('DOM fully loaded and parsed');
    setSnippets();
});

//catch all clicks
document.addEventListener('click', (e) => {
    // console.log(e.target);

    //--//
    //** catch when a click event from a copy button is fired **//
    //--//
    if(e.target.classList.contains('copy-button')) {
        toggleCopiedClass(e.target);
        writeToLocalStorage(e.target);
    };

    //--//
    //** catch when a click event from a code snippet twisty is fired or the code sinppet title **//
    //--//
    if(e.target.classList.contains('code-snippet__control') || e.target.classList.contains('code-snippet__title')) {
        collapseCodeSnippet(e.target);
    };

    //--//
    //** catch when a click event when the navigation information button is fired **//
    //--//
    if(e.target.id === 'nav-information-button') {
        navInformationButton.classList.toggle('active');
        navInformationMenu.classList.toggle('show');
    }

    //--//
    //** catch when a click event when the collapse all button is fired **//
    //--//
    if(e.target.id === 'collapse-all-button') {
        collapseAllCodeSnippets(allCodeSnippets);
    }

    //--//
    //** catch when a click event when the sort list button is fired **//
    //--//
    if(e.target.id === 'sort-list-button') {
        console.log('Sort list button');
    };

    //--//
    //** catch when a click event when the reset button is fired **//
    //--//
    if(e.target.id === 'reset-count-button') {
        resetLocalStorage();
        allCodeSnippets.forEach((snippet) => {
            setUICounter(0, snippet);
        });
    };

});

//catch all keydown devents
document.addEventListener('keydown', (e) => {
    if(e.target.classList.contains('code-snippet__title') && e.key === 'Enter') {
        collapseCodeSnippet(e.target);
    };
})