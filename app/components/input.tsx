import { ColourToggle } from './colourToggle';

interface InputProps {
  guessType: string;
  index: number;
  inputGuess: (event: any, index: number) => void;
  selectColour: (colour: string, index: number) => void;
  value: string;
}

export const Input = (props: InputProps) => {
  const inputIndex = props.index;
  return (
    <div className={`${props.guessType} inline-block relative mx-0.5`}>
      <input
        type='text'
        name={`letter-${inputIndex}`}
        maxLength={1}
        value={props.value}
        onChange={(event) => props.inputGuess(event, inputIndex)}
        className='w-10 uppercase text-center text-2xl leading-10 font-bold'
      />
      {props.value && props.guessType === '' && (
        <div className='absolute top-full w-full flex'>
          {['present', 'correct'].map((colour, index) => {
            return (
              <ColourToggle
                key={index}
                index={inputIndex}
                colour={colour}
                selectColour={props.selectColour}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
