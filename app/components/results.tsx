import { usePage } from '@/contexts/pageContext';

import { WordList } from './wordList';

export const Results = () => {
  const { possibleWords } = usePage();
  return (
    <>
      <h2 className='text-2xl mt-6'>Results</h2>
      <p className='mt-6'>
        <strong>Possible words</strong>: {possibleWords.length}
      </p>
      {possibleWords.length < 500 && <WordList />}
    </>
  );
};
