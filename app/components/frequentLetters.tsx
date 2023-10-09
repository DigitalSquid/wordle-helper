interface Props {
  mostFrequentLetters: Array<string>;
  guessLetters: Array<string>;
  guessTypes: Array<string>;
}

export const FrequentLetters = (props: Props) => {
  return (
    <div className='mt-4'>
      <p className='mb-2'>Most frequent letters by position</p>
      {props.mostFrequentLetters.map((letter, index) => {
        const correctLetter = props.guessTypes[index] === 'correct';
        return (
          <span
            key={index}
            className='w-8 m-0.5 border-2 leading-8 border-solid border-greyBorder inline-block uppercase'
          >
            {correctLetter ? props.guessLetters[index] : letter}
          </span>
        );
      })}
    </div>
  );
};
