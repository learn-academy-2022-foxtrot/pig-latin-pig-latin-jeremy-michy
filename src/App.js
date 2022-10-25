import React, { useState } from "react";
import "./App.css";
import butcherPigImage from "./assets/butcherPig.jpeg";

const App = () => {
  // ACTION ITEM: to make the development process easier there are some
  //preassigned words in the input field, when you are ready for your full user
  //experience delete the test words passed to useState and pass an empty string
  const [userInput, setUserInput] = useState("");
  const [inputTranslated, setInputTranslated] = useState("");

  // ACTION ITEM: the "myPigLatinCodeHere" function is where you will put your
  // logic to translate the sentence entered by the user into Pig Latin
  const myPigLatinCodeHere = () => {
    // NO MODIFICATION NEEDED: the variable "arrayOfUserInput" will contain the
    // text input from the user split into an array of words
    const arrayOfUserInput = userInput.split(" ");

    // NO MODIFICATION NEEDED: now that we have an array of words, we can map
    // over the array and look at each word
    const translatedWordsArray = arrayOfUserInput.map((word) => {
      // NO MODIFICATION NEEDED: this code will look at each word and identify
      // the vowels

      const eachWord = word.toLowerCase(); // <== set all words to lowercase

      const vowelsArray = eachWord.split("").filter((vowel) => {
        return (
          vowel === "a" ||
          vowel === "e" ||
          vowel === "i" ||
          vowel === "o" ||
          vowel === "u"
        );
      });

      // ACTION ITEM: your Pig Latin logic goes here!
      //==============================================================================

      // -----------------STRETCH #1 Punctuation -------------------------------
      //removes all punctuation
      const punctFreeWordArr = eachWord.split("").filter((punct) => {
        return (
          punct !== "," &&
          punct !== "." &&
          punct !== "!" &&
          punct !== "?" &&
          punct !== ":" &&
          punct !== ";" &&
          punct !== "'"
        );
      });

      // stores all punctuation
      const punctuationArr = eachWord.split("").filter((punct) => {
        return (
          punct === "," ||
          punct === "." ||
          punct === "!" ||
          punct === "?" ||
          punct === ":" ||
          punct === ";" ||
          punct === "'"
        );
      });

      // Story # 1
      // ========Vowel at beginning add "way to end ==========="
      for (let i = 0; i < vowelsArray.length; i++) {
        if (vowelsArray[i] === eachWord[0]) {
          // if word has punctuation...
          if (punctuationArr.length > 0) {
            // return the word with "way" and punctuation at the end.
            return punctFreeWordArr.join("") + "way" + punctuationArr.join("");
          } else {
            //else return original word with "way" at the end
            return eachWord + "way";
          }
        }
      }

      // Story # 2
      // =triggered if words have "qu" in them and modifies word accordingly==
      for (let i = 0; i < eachWord.length; i++) {
        if (eachWord[i] === "q" && eachWord[i + 1] === "u") {
          // squeal === ealsquay

          let startIndex = i; // saves start index of leters to remove
          let endIndex = i + 2; // saves end index of leters to remove

          while (startIndex <= endIndex) {
            const vowelSlice = punctFreeWordArr.slice(startIndex, endIndex); // [ s, q, u ]
            const otherSLice = punctFreeWordArr.slice(endIndex); //[ e, a, l ]

            // check if there is punctuationin word
            // if there is, add punctuation at end
            if (punctuationArr.length > 0) {
              return (
                otherSLice.join("") +
                vowelSlice.join("") +
                "ay" +
                punctuationArr.join("")
              );
            } else {
              // else return word with "ay" at the end
              return otherSLice.join("") + vowelSlice.join("") + "ay";
            }
          }
        }
      }

      // Story # 3
      // === triggered if no vowels and contains a "y" to make changes to word accordingly ===
      for (let i = 0; i < eachWord.length; i++) {
        if (vowelsArray.length === 0 && eachWord[i] === "y") {
          // fry === yfray
          let yIndex = i; // saves start index of leters to remove
          const vowelSlice = punctFreeWordArr.slice(yIndex, yIndex + 1); // ["y"]
          const otherSLice = punctFreeWordArr.slice(0, yIndex); // beginning characters

          // check if there is punctuationin word
          // if there is, add punctuation at end
          if (punctuationArr.length > 0) {
            // return the word with punctuation at the end.
            return (
              vowelSlice.join("") +
              otherSLice.join("") +
              "ay" +
              punctuationArr.join("")
            );
          } else {
            //else if no punctuation, do this...
            return vowelSlice.join("") + otherSLice.join("") + "ay"; // joined characters in new format
          }
        }
      }

      // Story # 4
      // through === ough "thr" + "ay"
      for (let i = 0; i < vowelsArray.length; i++) {
        let startIndex;
        let endIndex = 0;

        // if first letter is not a vowel then..
        if (vowelsArray[i] !== eachWord[0]) {
          startIndex = i;
          // iterate through letters to find the first vowel..
          // then store the index of that vowel
          for (let j = 0; j < vowelsArray.length; j++) {
            for (let k = 0; k < eachWord.length; k++) {
              if (vowelsArray[j] === eachWord[k]) {
                if (endIndex === 0) {
                  endIndex = k;
                }
              }
            }
          }
          const conSlice = punctFreeWordArr.slice(startIndex, endIndex); //["t", "h", "r"];
          const otherSLice = punctFreeWordArr.slice(endIndex);

          // check if there is punctuationin word
          // if there is, add punctuation at end
          if (punctuationArr.length > 0) {
            // return the word with punctuation at the end.
            return (
              otherSLice.join("") +
              conSlice.join("") +
              "ay" +
              punctuationArr.join("")
            );
          } else {
            //else if no punctuation, do this
            return otherSLice.join("") + conSlice.join("") + "ay";
          }
        }
      }
      //==============================================================================
      // ACTION ITEM: this return will be the output of your Pig Latin'd code
      // if inout does not match requirements above then return message
      return "Please enter words, or suffer the consequences!!!";
    });

    // NO MODIFICATION NEEDED: once the code has been modified it gets joined
    // from an array back to a string
    const translatedWords = translatedWordsArray.join(" ");

    // NO MODIFICATION NEEDED: this will update the inputTranslated variable in
    // state
    setInputTranslated(translatedWords);
  };

  // ACTION ITEM: this method restarts the game by setting the original state,
  // when you are ready for your full user experience delete the test words in
  // setUserInput and pass an empty string
  const restartGame = () => {
    setUserInput("");
    setInputTranslated("");
  };

  // NO MODIFICATION NEEDED: this method prevents React from refreshing the
  // page unnecessarily
  const setUpPreventDefault = (e) => {
    e.preventDefault();
    myPigLatinCodeHere();
  };

  // NO MODIFICATION NEEDED: this method takes the value of the input and saves
  // it in state
  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="page-container">
      <div className="body-container">
        <h1>Pig Latin Translator</h1>
        <img
          src={butcherPigImage}
          alt="pig with butcher cut names in pig latin"
          className="butcher-pig-image"
        />
        <div className="input-section">
          <h4>Enter phrase to be translated:</h4>
          <input
            type="text"
            className="user-input"
            onChange={handleInput}
            value={userInput}
          />
          <br />
          <button onClick={setUpPreventDefault}>Submit</button>
          <button onClick={restartGame}>Clear</button>
        </div>
        <p className="translatedText">{inputTranslated}</p>
      </div>
      <footer>&copy; 2022 | Coded by: Your Names Here!</footer>
    </div>
  );
};

export default App;
