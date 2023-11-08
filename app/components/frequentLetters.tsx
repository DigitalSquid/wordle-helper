import { usePage } from '@/contexts/pageContext';

export const FrequentLetters = () => {
  const { guessLetters, guessTypes, mostFrequentLetters } = usePage();

  return (
    <div className='mt-4'>
      {mostFrequentLetters.length > 0 && (
        <p className='mb-2'>Most frequent letters by position</p>
      )}
      {mostFrequentLetters.map((letter, index) => {
        const correctLetter = guessTypes[index] === 'correct';
        return (
          <span
            key={index}
            className='w-8 m-0.5 border-2 leading-8 border-solid border-greyBorder inline-block uppercase'
          >
            {correctLetter ? guessLetters[index] : letter}
          </span>
        );
      })}
    </div>
  );
};
