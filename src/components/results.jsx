export const Results = ({ possibleWords }) => {
  return (
    <section className='is-tight'>
      <div className='section results'>
        {possibleWords.map((word, index) => {
          return <p key={index}>{word.toUpperCase()}</p>;
        })}
      </div>
    </section>
  );
};
