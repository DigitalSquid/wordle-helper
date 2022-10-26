import './colourToggle.scss';

export const ColourToggle = ({ colour, selectColour }) => {
  return (
    <button
      className={`colour-toggle ${colour}`}
      value={colour}
      type='button'
      onClick={selectColour}
    ></button>
  );
};
