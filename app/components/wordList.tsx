import { usePage } from '@/contexts/pageContext';

export const WordList = () => {
  const { possibleWords } = usePage();
  return (
    <section className='mt-2'>
      <div className='section results'>
        {possibleWords.map((word, index) => {
          return <p key={index}>{word.toUpperCase()}</p>;
        })}
      </div>
    </section>
  );
};
