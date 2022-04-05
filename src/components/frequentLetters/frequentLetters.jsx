import './frequentLetters.scss';

export const FrequentLetters = ({ mostFrequentLetters }) => {
  return (
    <div className='frequent-letters'>
      <p>Most frequent letters by position:</p>
      {mostFrequentLetters.map((letter, index) => {
        return <span key={index}>{letter}</span>;
      })}
    </div>
  );
};
