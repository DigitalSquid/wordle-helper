'use client';

import { useState, useEffect } from 'react';

import { Input } from './components/input';
import { FrequentLetters } from './components/frequentLetters';
import { Letters } from './components/letters';
import { Results } from './components/results';

import Words from './data/words';

export default function Home() {
  const [wordlist] = useState(Words);
  const [absentLetters, setAbsentLetters] = useState<string[]>([]);
  const [mostFrequentLetters, setMostFrequentLetters] = useState<string[]>([]);
  const [filteredWords, setFilteredWords] = useState<string[]>([]);
  const [guessLetters, setGuessLetters] = useState(['', '', '', '', '']);
  const [guessTypes, setGuessTypes] = useState(['', '', '', '', '']);
  const [isRemoveLetter, setIsRemoveLetter] = useState(false);

  useEffect(() => {
    filterWords();
    setIsRemoveLetter(false);
  }, [guessTypes, absentLetters]);

  const selectColour = (colour: string, index: number) => {
    const newGuessTypes = [...guessTypes];
    newGuessTypes[index] = colour;
    setGuessTypes(newGuessTypes);
  };

  const inputGuess = (event: any, index: number) => {
    const newGuessLetters = [...guessLetters];
    const newGuessTypes = [...guessTypes];

    const inputValue = event.currentTarget.value.toLowerCase();
    const isDeleteInput = inputValue === '';

    if (isDeleteInput) {
      newGuessLetters[index] = '';
      newGuessTypes[index] = '';

      setIsRemoveLetter(true);
      setGuessLetters(newGuessLetters);
      setGuessTypes(newGuessTypes);
    } else {
      newGuessLetters[index] = inputValue;
      setGuessLetters(newGuessLetters);
    }
  };

  const letterSelection = (letter: string, letterState: string) => {
    // TODO: Deleting a letter from input incorrectly makes it absent

    const isLetterExcluded = absentLetters.includes(letter);
    // let action = '';
    let newAbsentLetters: Array<string> = [];

    if (!letterState || letterState === 'absent') {
      if (isLetterExcluded) {
        newAbsentLetters = absentLetters.filter(
          (absentLetter) => absentLetter !== letter
        );
        setIsRemoveLetter(true);
        // action = 'removeLetter';
      } else {
        newAbsentLetters = [...absentLetters];
        newAbsentLetters.push(letter);
      }
      setAbsentLetters(newAbsentLetters);
    }
  };

  const filterWords = () => {
    let correctLetters = {} as any;
    let presentLetters = {} as any;

    guessLetters.forEach((letter, index) => {
      if (letter) {
        const guessType = guessTypes[index];
        if (guessType === 'correct') {
          correctLetters[index] = letter;
        }
        if (guessType === 'present') {
          presentLetters[index] = letter;
        }
      }
    });

    const allExcludedLetters = (word: string) =>
      Object.values(absentLetters).every((letter) => !word.includes(letter));

    const correctLetter = (word: string) =>
      Object.entries(correctLetters).every(([key, value]) => {
        return word.charAt(Number(key)) === value;
      });
    const presentLetter = (word: string) =>
      Object.entries(presentLetters).every(
        ([key, value]) =>
          word.includes(value as string) && word.charAt(Number(key)) !== value
      );

    let wordsToFilter =
      filteredWords.length > 0 && isRemoveLetter ? filteredWords : wordlist;

    if (Object.keys(correctLetters).length > 0) {
      wordsToFilter = wordsToFilter.filter(correctLetter);
    }

    if (absentLetters.length > 0) {
      wordsToFilter = wordsToFilter.filter(allExcludedLetters);
    }

    if (Object.keys(presentLetters).length > 0) {
      wordsToFilter = wordsToFilter.filter(presentLetter);
    }

    setFilteredWords(wordsToFilter);
    extrapolatePossibleLetters();
  };

  const getMostFrequent = (arr: any) => {
    const hashmap = arr.reduce((acc: any, val: number) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(hashmap).reduce((a, b) =>
      hashmap[a] > hashmap[b] ? a : b
    );
  };

  const extrapolatePossibleLetters = () => {
    const availableWords = [...filteredWords];
    const possibleLetters: { [key: number]: Array<string> } = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
    };
    let mostFrequentLetters: Array<string> = [];

    availableWords.forEach((word) => {
      word.split('').forEach((letter, index) => {
        possibleLetters[index].push(letter);
      });
    });

    for (const letterIndex in possibleLetters) {
      if (possibleLetters[letterIndex].length > 0) {
        mostFrequentLetters.push(getMostFrequent(possibleLetters[letterIndex]));
      }
    }

    setMostFrequentLetters(mostFrequentLetters);
  };

  const hasGuesses =
    !guessLetters.every((value) => value === '') || absentLetters.length > 0;
  const possibleWords = hasGuesses ? filteredWords : wordlist;

  return (
    <div className='mt-8'>
      <header>
        <h1 className='text-3xl'>Wordle Helper</h1>
      </header>
      <main className='mt-8'>
        <div>
          {[...Array(5)].map((_, index) => {
            return (
              <Input
                key={index}
                value={guessLetters[index]}
                index={index}
                selectColour={selectColour}
                inputGuess={inputGuess}
                guessType={guessTypes[index]}
              />
            );
          })}
        </div>
        <Letters
          letterSelection={letterSelection}
          absentLetters={absentLetters}
          guessLetters={guessLetters}
          guessTypes={guessTypes}
        />
      </main>
      <aside className='mt-8'>
        {mostFrequentLetters.length > 0 && (
          <FrequentLetters
            mostFrequentLetters={mostFrequentLetters}
            guessLetters={guessLetters}
            guessTypes={guessTypes}
          />
        )}
        <h2 className='text-2xl mt-6'>Results</h2>
        <p className='mt-2'>
          <strong>Possible words</strong>: {possibleWords.length}
        </p>
        {possibleWords.length < 500 && (
          <Results possibleWords={possibleWords} />
        )}
      </aside>
    </div>
  );
}
