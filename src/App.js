import React from 'react';

import { Input } from './components/input/input';
import { FrequentLetters } from './components/frequentLetters/frequentLetters';
import { Letters } from './components/letters/letters';
import { Results } from './components/results';

import Words from './data/words';

import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      wordlist: Words,
      absentLetters: [],
      mostFrequentLetters: [],
      filteredWords: [],
      guess: {
        0: {
          value: '',
          type: '',
        },
        1: {
          value: '',
          type: '',
        },
        2: {
          value: '',
          type: '',
        },
        3: {
          value: '',
          type: '',
        },
        4: {
          value: '',
          type: '',
        },
      },
    };
  }

  letterSelection = (e) => {
    const letter = e.currentTarget.value;
    let absentLetters = this.state.absentLetters;
    const isLetterExcluded = absentLetters.includes(letter);
    let action = '';

    if (
      (!e.currentTarget.classList.contains('present') &&
        !e.currentTarget.classList.contains('correct')) ||
      e.currentTarget.classList.length === 0
    ) {
      if (isLetterExcluded) {
        absentLetters = this.state.absentLetters.filter(
          (letter) => letter !== e.target.value
        );
        action = 'removeLetter';
      } else {
        absentLetters.push(letter);
      }
      this.setState(
        {
          absentLetters: absentLetters,
        },
        () => {
          this.filterWords(action);
        }
      );
    }
  };

  selectColour = (e) => {
    const button = e.currentTarget;
    const input = button.parentElement.parentElement.querySelector('input');
    const { guess } = this.state;
    const guessIndex = input.name.substr(-1);

    guess[guessIndex].value = input.value;
    guess[guessIndex].type = button.value;

    this.setState(
      {
        guess: guess,
      },
      () => {
        this.filterWords();
      }
    );
  };

  inputGuess = (e) => {
    const input = e.currentTarget;
    const { guess } = this.state;
    const inputValue = input.value.toLowerCase();
    const guessIndex = input.name.substr(-1);
    const isDeleteInput = inputValue === '';

    if (isDeleteInput) {
      guess[guessIndex].value = '';
      guess[guessIndex].type = '';
    } else {
      guess[guessIndex].value = inputValue;
    }

    this.setState(
      {
        guess: guess,
      },
      () => {
        if (isDeleteInput) {
          this.filterWords('removeLetter');
        }
      }
    );
  };

  filterWords = (action) => {
    const { guess, wordlist, absentLetters } = this.state;
    let filteredWords = this.state.filteredWords;
    let correctLetters = {};
    let presentLetters = {};

    for (const guessIndex in guess) {
      if (guess[guessIndex].type === 'correct') {
        correctLetters[guessIndex] = guess[guessIndex].value;
      }
      if (guess[guessIndex].type === 'present') {
        presentLetters[guessIndex] = guess[guessIndex].value;
      }
    }

    const allExcludedLetters = (word) =>
      Object.values(absentLetters).every((letter) => !word.includes(letter));

    const correctLetter = (word) =>
      Object.entries(correctLetters).every(([key, value]) => {
        return word.charAt(key) === value;
      });
    const presentLetter = (word) =>
      Object.entries(presentLetters).every(
        ([key, value]) => word.includes(value) && word.charAt(key) !== value
      );

    let wordsToFilter =
      filteredWords.length > 0 && action !== 'removeLetter'
        ? filteredWords
        : wordlist;

    if (Object.keys(correctLetters).length > 0) {
      wordsToFilter = wordsToFilter.filter(correctLetter);
    }

    if (absentLetters.length > 0) {
      wordsToFilter = wordsToFilter.filter(allExcludedLetters);
    }

    if (Object.keys(presentLetters).length > 0) {
      wordsToFilter = wordsToFilter.filter(presentLetter);
    }

    this.setState(
      {
        filteredWords: wordsToFilter,
      },
      () => {
        this.extrapolatePossibleLetters();
      }
    );
  };

  getMostFrequent = (arr) => {
    const hashmap = arr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(hashmap).reduce((a, b) =>
      hashmap[a] > hashmap[b] ? a : b
    );
  };

  extrapolatePossibleLetters = () => {
    const availableWords = this.state.filteredWords;
    const possibleLetters = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
    };
    let mostFrequentLetters = [];

    availableWords.forEach((word) => {
      word.split('').forEach((letter, index) => {
        possibleLetters[index].push(letter);
      });
    });

    for (const letterIndex in possibleLetters) {
      if (possibleLetters[letterIndex].length > 0) {
        mostFrequentLetters.push(
          this.getMostFrequent(possibleLetters[letterIndex])
        );
      }
    }

    this.setState({
      mostFrequentLetters: mostFrequentLetters,
    });
  };

  render() {
    const {
      absentLetters,
      wordlist,
      mostFrequentLetters,
      filteredWords,
      guess,
    } = this.state;
    const hasGuesses =
      Object.keys(guess).some((i) => guess[i].type !== '') ||
      absentLetters.length > 0;
    const possibleWords = hasGuesses ? filteredWords : wordlist;

    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Wordle Helper</h1>
        </header>
        <main>
          <form>
            <fieldset>
              {[...Array(5)].map((_, index) => {
                return (
                  <Input
                    key={index}
                    value={guess[index].value}
                    index={index}
                    selectColour={this.selectColour}
                    inputGuess={this.inputGuess}
                    guessType={guess[index].type}
                  />
                );
              })}
            </fieldset>
            <Letters
              letterSelection={this.letterSelection}
              absentLetters={absentLetters}
              guess={guess}
            />
          </form>
          <aside>
            <h2>Results</h2>
            <p>
              <strong>Possible words</strong>: {possibleWords.length}
            </p>
            {mostFrequentLetters.length > 0 && (
              <FrequentLetters mostFrequentLetters={mostFrequentLetters} />
            )}
            {possibleWords.length < 500 && (
              <Results possibleWords={possibleWords} />
            )}
          </aside>
        </main>
      </div>
    );
  }
}

export default App;
