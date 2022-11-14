import Keyboard from '../../data/keyboard-en';

import './letters.scss';

export const Letters = ({ letterSelection, absentLetters, guess }) => {
  const letterRows = [];
  let rowCount = 10;
  {
    Keyboard.map((letter, index) => {
      let letterState =
        absentLetters.includes(letter) && letter !== '' ? 'absent' : '';
      for (const guessLetter in guess) {
        if (guess[guessLetter].value) {
          if (guess[guessLetter].value === letter) {
            letterState = guess[guessLetter].type;
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
          className={letterState}
          onClick={letterSelection}
        >
          {letter}
        </button>,
      ];
    });
  }
  return (
    <section>
      <h2>Available letters</h2>
      <div className='available-letters'>
        {letterRows.map((button, i) => (
          <div className='row' key={i}>
            {button}
          </div>
        ))}
      </div>
    </section>
  );
};
