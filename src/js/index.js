////////////////////////
//VARIABLES
////////////////////////

////////////////////////
//FUNCTIONS
////////////////////////

////////////////////////
//EVENT LISTENERS
////////////////////////
document.addEventListener('click', (e) => {

    // console.log(e.target);

    //catch when a click event from a copy button is fired
    if(e.target.classList.contains('copy-button')) {
        const codeToCopy = e.target.closest('.code-snippet__snippet').querySelector('CODE').innerHTML; //select the code snippet
        navigator.clipboard.writeText(codeToCopy); //write the code snippet to the clipboard
        // change the copy button to reflect it has been copied
        // console.log(code);
    };

    // catch when a click event from a code snippet twisty is fired
    if(e.target.classList.contains('code-snippet__control') || e.target.classList.contains('code-snippet__title')) {

        const codeSnippetContent = e.target.closest('.code-snippet').querySelector('.code-snippet__content');
        const codeSnippetTwisty = e.target.closest('.code-snippet').querySelector('.code-snippet__control');
        
        if(codeSnippetTwisty.classList.contains('expanded')) { // check if the twisty has the expanded clast or not
            codeSnippetTwisty.classList.remove('expanded');
            codeSnippetContent.classList.remove('show')
            return;
        }
        codeSnippetTwisty.classList.add('expanded');
        codeSnippetContent.classList.add('show')
        return;
    }
    

});