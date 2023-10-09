import Keyboard from '../data/keyboard-en';

interface LettersProps {
  letterSelection: (letter: string, letterState: string) => void;
  absentLetters: Array<string>;
  guessLetters: Array<string>;
  guessTypes: Array<string>;
}

export const Letters = (props: LettersProps) => {
  const letterRows: Array<React.JSX.Element>[] = [];
  let rowCount = 10;

  Keyboard.map((letter, index) => {
    let letterState =
      props.absentLetters.includes(letter) && letter !== '' ? 'absent' : '';

    for (const guessLetter in props.guessLetters) {
      const currentGuessLetter = props.guessLetters[guessLetter];
      if (currentGuessLetter) {
        if (currentGuessLetter === letter) {
          letterState = props.guessTypes[guessLetter];
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
        onClick={() => props.letterSelection(letter, letterState)}
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
