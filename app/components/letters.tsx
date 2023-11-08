import Keyboard from '@/data/keyboard-en';

import { usePage } from '@/contexts/pageContext';

export const Letters = () => {
  const { absentLetters, guessLetters, guessTypes, letterSelection } =
    usePage();
  const letterRows: Array<React.JSX.Element>[] = [];
  let rowCount = 10;

  Keyboard.map((letter, index) => {
    let letterState =
      absentLetters.includes(letter) && letter !== '' ? 'absent' : '';

    for (const guessLetter in guessLetters) {
      const currentGuessLetter = guessLetters[guessLetter];
      if (currentGuessLetter) {
        if (currentGuessLetter === letter) {
          letterState = guessTypes[guessLetter];
        }
      }
    }

    rowCount = index === 19 ? 9 : rowCount;
    let rowIndex = Math.floor(index / rowCount);
    letterRows[rowIndex] = [
      ...(letterRows[rowIndex] || []),
      <button
        key={index}
        type='button'
        value={letter}
        className={`w-8 p-1.5 m-0.5 bg-buttonDefault text-darkGrey font-bold uppercase ${letterState}`}
        onClick={() => letterSelection(letter, letterState)}
      >
        {letter}
      </button>,
    ];
  });

  return (
    <section className='mt-8'>
      <h2 className='text-2xl'>Available letters</h2>
      <div className='available-letters mt-4'>
        {letterRows.map((button, i) => (
          <div className='row' key={i}>
            {button}
          </div>
        ))}
      </div>
    </section>
  );
};
