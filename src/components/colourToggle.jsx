export const ColourToggle = ({ colour, selectColour }) => {
  return (
    <button
      className={colour}
      value={colour}
      type='button'
      onClick={selectColour}
    ></button>
  );
};
