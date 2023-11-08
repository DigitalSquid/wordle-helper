import { Input } from '@/components/input';

import { usePage } from '@/contexts/pageContext';

export const Guess = () => {
  const { guessLetters, guessTypes, inputGuess, selectColour } = usePage();
  return (
    <>
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
    </>
  );
};
