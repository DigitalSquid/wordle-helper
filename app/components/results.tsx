interface Props {
  possibleWords: Array<string>;
}

export const Results = (props: Props) => {
  return (
    <section className='mt-2'>
      <div className='section results'>
        {props.possibleWords.map((word, index) => {
          return <p key={index}>{word.toUpperCase()}</p>;
        })}
      </div>
    </section>
  );
};
