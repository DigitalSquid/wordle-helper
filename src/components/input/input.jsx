import { ColourToggle } from '../colourToggle/colourToggle';

import './input.scss';

export const Input = ({
  value,
  index,
  selectColour,
  inputGuess,
  guessType,
}) => {
  return (
    <div className={`letter-input ${guessType}`}>
      <input
        type='text'
        name={`letter-${index}`}
        maxLength='1'
        value={value}
        onChange={inputGuess}
      />
      {value && guessType === '' && (
        <div className='colour-toggle'>
          {['present', 'correct'].map((colour, index) => {
            return (
              <ColourToggle
                key={index}
                colour={colour}
                selectColour={selectColour}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
