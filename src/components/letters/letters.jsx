import Keyboard from '../../data/keyboard-en';

import './letters.scss';

export const Letters = ({ letterSelection, absentLetters, guess }) => {
  return (
    <section>
      <h2>Available letters</h2>
      <div className='available-letters'>
        {Keyboard.map((letter, index) => {
          let letterState =
            absentLetters.includes(letter) && letter !== '' ? 'absent' : '';
          for (const guessLetter in guess) {
            if (guess[guessLetter].value) {
              if (guess[guessLetter].value === letter) {
                letterState = guess[guessLetter].type;
              }
            }
          }
          return (
            <button
              key={index}
              type='button'
              value={letter}
              className={letterState}
              onClick={letterSelection}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </section>
  );
};
