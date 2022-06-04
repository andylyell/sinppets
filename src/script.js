(function () {
    'use strict';

    ////////////////////////
    //VARIABLES
    ////////////////////////
    ////////////////////////
    //FUNCTIONS
    ////////////////////////
    ////////////////////////
    //EVENT LISTENERS
    ////////////////////////
    document.addEventListener('click', function (e) {
      console.log(e.target); //catch when a click event from a copy button is fired

      if (e.target.classList.contains('copy-button')) {
        var codeToCopy = e.target.closest('.code-snippet__snippet').querySelector('CODE').innerHTML; //select the code snippet

        navigator.clipboard.writeText(codeToCopy); //write the code snippet to the clipboard

        e.target.querySelector('.button__primary--copied').classList.add('show');
        setTimeout(function () {
          e.target.querySelector('.button__primary--copied').classList.remove('show');
        }, 800);
      }

      if (e.target.classList.contains('code-snippet__control') || e.target.classList.contains('code-snippet__title')) {
        var codeSnippetContent = e.target.closest('.code-snippet').querySelector('.code-snippet__content');
        var codeSnippetTwisty = e.target.closest('.code-snippet').querySelector('.code-snippet__control');

        if (codeSnippetTwisty.classList.contains('expanded')) {
          // check if the twisty has the expanded clast or not
          codeSnippetTwisty.classList.remove('expanded');
          codeSnippetContent.classList.remove('show');
          return;
        }

        codeSnippetTwisty.classList.add('expanded');
        codeSnippetContent.classList.add('show');
        return;
      }
    });

})();
//# sourceMappingURL=script.js.map
