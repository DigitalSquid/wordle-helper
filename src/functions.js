function extrapolatePossibleLetters(props) {
  const availableWords = props.possibleWords;
  // const availableWords = props.filteredWords;
  const possibleLetters = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
  };
  let _mostFrequentLetters = [];

  if (availableWords.length > 0) {
    availableWords.forEach((word) => {
      word.split('').forEach((letter, index) => {
        possibleLetters[index].push(letter);
      });
    });

    for (const letterIndex in possibleLetters) {
      if (possibleLetters[letterIndex].length > 0) {
        _mostFrequentLetters.push(
          getMostFrequent(possibleLetters[letterIndex])
        );
      }
    }

    props.setMostFrequentLetters(_mostFrequentLetters);
  }
}

function getMostFrequent(arr) {
  const hashmap = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b
  );
}

function filterWords(props) {
  const hasPresentLetters = props.guessTypes.some(
    (letter) => letter === 'present'
  );
  const hasCorrectLetters = props.guessTypes.some(
    (letter) => letter === 'correct'
  );

  // for (const guessIndex in props.guesses[0]) {
  //   if (props.guesses[0][guessIndex].type === 'correct') {
  //     correctLetters[guessIndex] = props.guesses[0][guessIndex].value;
  //   }
  //   if (props.guesses[0][guessIndex].type === 'present') {
  //     presentLetters[guessIndex] = props.guesses[0][guessIndex].value;
  //   }
  // }

  const allExcludedLetters = (word) =>
    Object.values(props.absentLetters).every(
      (letter) => !word.includes(letter)
    );

  const newPresentLetter = (word) =>
    props.guessLetters.every(([value, index]) => {
      console.log(value, index);

      return word.includes(value) && props.guessTypes[index] === 'present';
    });

  const guessLettersObj = { ...props.guessLetters };

  const correctLetters = (word) =>
    Object.entries(guessLettersObj).every(([key, value]) => {
      console.log(key, value);
      // return word.charAt(key) === value;
    });

  console.log(guessLettersObj);
  // props.guessLetters.map((letter, index) => {
  //   console.log(letter, index);
  // });
  // props.guessLetters.forEach((letter, index) => {
  //   if (letter) {
  //     console.log(index, letter);
  //     return word.charAt(index) === letter;
  //   }
  //   // props.guessLetters.every(([letter, index]) => {
  // });

  const presentLetter = (word) =>
    Object.entries(props.presentLetters).every(
      ([key, value]) => word.includes(value) && word.charAt(key) !== value
    );

  let wordsToFilter = props.wordsToFilter;

  if (hasCorrectLetters) {
    wordsToFilter = wordsToFilter.filter(correctLetters);
    // wordsToFilter = wordsToFilter.filter(correctLetter);
    // wordsToFilter = wordsToFilter.filter((word) => {
    //   let matchingLetters = null;
    //   props.guessLetters.forEach((letter, index) => {
    //     if (letter) {
    //       return word.charAt(index) === letter;
    //     }
    //     // return word.charAt(index) === letter;
    //   });
    //   console.log(test);
    //   return true;
    // });
  }

  console.log('words 2', wordsToFilter);

  if (props.absentLetters.length > 0) {
    wordsToFilter = wordsToFilter.filter(allExcludedLetters);
  }

  if (hasPresentLetters) {
    wordsToFilter = wordsToFilter.filter(newPresentLetter);
  }

  props.setPossibleWords(wordsToFilter);
}

function selectColour(setGuessTypes, letterIndex, colour) {
  setGuessTypes((guessTypes) => {
    const updatedGuessTypes = [...guessTypes];
    updatedGuessTypes[letterIndex] = colour;
    return updatedGuessTypes;
  });
}

const inputGuess = (e, setGuessLetters) => {
  const input = e.currentTarget;
  const inputValue = input.value.toLowerCase();
  const letterIndex = input.name.split('-')[1];
  const isDeleteInput = inputValue === '';

  setGuessLetters((guessLetters) => {
    const updatedGuessLetters = [...guessLetters];
    updatedGuessLetters[letterIndex] = inputValue;
    return updatedGuessLetters;
  });

  // console.log(inputValue, letterIndex, isDeleteInput);
};

// function inputGuess(e, props) {
//   // if (isDeleteInput) {
//   //   guess[letterIndex].value = '';
//   //   guess[letterIndex].type = '';
//   // } else {
//   //   guess[letterIndex].value = inputValue;
//   // }

//   console.log(props);
//   // props.setLetterRemoved(!isDeleteInput);
//   // this.setState(
//   //   {
//   //     guess: guess,
//   //   },
//   //   () => {
//   //     if (isDeleteInput) {
//   //       this.filterWords('removeLetter');
//   //     }
//   //   }
//   // );
// }

module.exports = {
  extrapolatePossibleLetters,
  filterWords,
  selectColour,
  inputGuess,
};
