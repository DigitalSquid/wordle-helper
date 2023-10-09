interface ColourToggleProps {
  colour: string;
  index: number;
  selectColour: (colour: string, index: number) => void;
}

export const ColourToggle = (props: ColourToggleProps) => {
  return (
    <button
      className={`p-2.5 border border-greyBorder ${props.colour}`}
      value={props.colour}
      type='button'
      onClick={() => props.selectColour(props.colour, props.index)}
    ></button>
  );
};
