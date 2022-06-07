(function () {
  'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  ////////////////////////
  //VARIABLES
  ////////////////////////
  var allCodeSnippets = document.querySelectorAll('.code-snippet'); //get all code snippets as a node list

  var navInformationButton = document.getElementById('nav-information-button');
  var navInformationMenu = document.getElementById('nav-information-menu'); ////////////////////////
  //FUNCTIONS
  ////////////////////////
  //** VIEW FUNCTIONS */
  //Function to toggle copied class on button

  function toggleCopiedClass(copyButton) {
    var codeToCopy = copyButton.closest('.code-snippet__snippet').querySelector('CODE').innerHTML; //select the code snippet

    navigator.clipboard.writeText(codeToCopy); //write the code snippet to the clipboard

    copyButton.querySelector('.button__primary--copied').classList.add('show'); //add the show class to the button

    setTimeout(function () {
      // setTimeout to remove the show class after 800ms
      copyButton.querySelector('.button__primary--copied').classList.remove('show'); //remove the show class to the button
    }, 800);
  }

  function collapseSnippet(twisty, content) {
    twisty.classList.remove('expanded'); // remove class expanded

    content.classList.remove('show'); // remove class show

    return;
  } //function to expand a code snippet


  function expandSnippet(twisty, content) {
    twisty.classList.add('expanded'); // add class expanded

    content.classList.add('show'); // add class show
  } //Function to toggle collapse/expand of a code snippet


  function collapseCodeSnippet(snippet) {
    var codeSnippetTwisty = snippet.closest('.code-snippet').querySelector('.code-snippet__control'); //get the twisty element

    var codeSnippetContent = snippet.closest('.code-snippet').querySelector('.code-snippet__content'); //get the content element

    if (codeSnippetTwisty.classList.contains('expanded')) {
      // check if the twisty has the expanded clast or not
      collapseSnippet(codeSnippetTwisty, codeSnippetContent);
      return;
    }

    expandSnippet(codeSnippetTwisty, codeSnippetContent);
    return;
  }

  function collapseAllCodeSnippets() {
    allCodeSnippets.forEach(function (snippet) {
      var codeSnippetContent = snippet.closest('.code-snippet').querySelector('.code-snippet__content'); //get the twisty element

      var codeSnippetTwisty = snippet.closest('.code-snippet').querySelector('.code-snippet__control'); //get the content element

      if (codeSnippetTwisty.classList.contains('expanded')) {
        // check if the twisty has the expanded clast or not
        collapseSnippet(codeSnippetTwisty, codeSnippetContent);
        return;
      }
    });
  }

  function setUICounter(number, snippet) {
    var snippetCounter;

    if (snippet.classList.contains('copy-button')) {
      //check if a button was passed
      snippetCounter = snippet.closest('.code-snippet__snippet-control').querySelector('.code-snippet__snippet-counter'); // get the number counter in the snippet
    } else {
      //otherwise you get the whole snippet
      snippetCounter = snippet.querySelector('.code-snippet__snippet-control').querySelector('.code-snippet__snippet-counter'); // get the number counter in the snippet
    }

    if (number) {
      //check if the number exists
      snippetCounter.innerHTML = number; //set inner html of element to amount

      return;
    }

    snippetCounter.innerHTML = 0; //set inner html of element to zero

    return;
  } //** MODEL FUNCTIONS */
  //Function to read from localStorage and set counters for snippets in the UI


  function setSnippets() {
    var codeSnippetsLocalStorage = localStorage.getItem('snippets'); // get the localStorage

    if (!codeSnippetsLocalStorage) {
      // if there is no localStorage then return out of function
      return;
    }

    codeSnippetsLocalStorage = JSON.parse(codeSnippetsLocalStorage); // if it does exists then parse the contents

    allCodeSnippets.forEach(function (snippet) {
      var snippetId = snippet.querySelector('.code-snippet__code').querySelector('CODE').dataset.id; //get the unique snippet id
      // console.log(snippetId);

      for (var _i = 0, _Object$entries = Object.entries(codeSnippetsLocalStorage); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        if (snippetId === key) {
          setUICounter(value, snippet);
          return;
        }

        setUICounter(0, snippet);
      }
    });
  }

  function writeToLocalStorage(copySnippet) {
    // console.log(copySnippet);
    var snippetId = copySnippet.closest('.code-snippet__snippet').querySelector('CODE').dataset.id; //get the unique snippet id

    var codeSnippetsLocalStorage = localStorage.getItem('snippets'); // get the localStorage

    if (codeSnippetsLocalStorage) {
      //check if local storage exists
      codeSnippetsLocalStorage = JSON.parse(codeSnippetsLocalStorage); // if it does exists then parse the contents
    } else {
      codeSnippetsLocalStorage = {}; //if it does not set it to an object
    }

    if (codeSnippetsLocalStorage[snippetId]) {
      //check if this snippet has been added to the object yet
      var amount = parseInt(codeSnippetsLocalStorage[snippetId]); // get value and set as a number

      amount++; // increment the value by 1

      codeSnippetsLocalStorage[snippetId] = amount; //set the number in local storage back to the new incremented amount

      setUICounter(amount, copySnippet); //update UI
    } else {
      codeSnippetsLocalStorage[snippetId] = 1; //add snippet with unique id to the object and set its value to 1

      setUICounter(1, copySnippet); //update UI
    }

    localStorage.setItem('snippets', JSON.stringify(codeSnippetsLocalStorage)); //set the updated localstorage object back to localstorage
  }

  function resetLocalStorage() {
    var codeSnippetsLocalStorage = localStorage.getItem('snippets'); // get the localStorage

    if (codeSnippetsLocalStorage) {
      localStorage.setItem('snippets', JSON.stringify({})); //set the updated localstorage object back to localstorage

      return;
    }

    return;
  } ////////////////////////
  //EVENT LISTENERS
  ////////////////////////
  //call script upon page load


  window.addEventListener('load', function (e) {// console.log(localStorage);
  });
  window.addEventListener('DOMContentLoaded', function (e) {
    // console.log('DOM fully loaded and parsed');
    setSnippets();
  }); //catch all clicks

  document.addEventListener('click', function (e) {
    // console.log(e.target);
    //--//
    //** catch when a click event from a copy button is fired **//
    //--//
    if (e.target.classList.contains('copy-button')) {
      toggleCopiedClass(e.target);
      writeToLocalStorage(e.target);
    }
    //** catch when a click event from a code snippet twisty is fired or the code sinppet title **//
    //--//

    if (e.target.classList.contains('code-snippet__control') || e.target.classList.contains('code-snippet__title')) {
      collapseCodeSnippet(e.target);
    }
    //** catch when a click event when the navigation information button is fired **//
    //--//

    if (e.target.id === 'nav-information-button') {
      navInformationButton.classList.toggle('active');
      navInformationMenu.classList.toggle('show');
    } //--//
    //** catch when a click event when the collapse all button is fired **//
    //--//


    if (e.target.id === 'collapse-all-button') {
      collapseAllCodeSnippets();
    } //--//
    //** catch when a click event when the sort list button is fired **//
    //--//


    if (e.target.id === 'sort-list-button') {
      console.log('Sort list button');
    }
    //** catch when a click event when the reset button is fired **//
    //--//

    if (e.target.id === 'reset-count-button') {
      resetLocalStorage();
      allCodeSnippets.forEach(function (snippet) {
        setUICounter(0, snippet);
      });
    }
  }); //catch all keydown devents

  document.addEventListener('keydown', function (e) {
    if (e.target.classList.contains('code-snippet__title') && e.key === 'Enter') {
      collapseCodeSnippet(e.target);
    }
  });

})();
//# sourceMappingURL=script.js.map
