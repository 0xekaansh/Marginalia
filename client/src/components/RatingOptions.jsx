import OptionContainer from "./OptionContainer";

function RatingOptions(props) {
  const ratingOptions = [
    { label: "Not Rated", value: "" },
    { label: "⭐ 5 - Masterpiece", value: "5" },
    { label: "⭐ 4 - Great", value: "4" },
    { label: "⭐ 3 - Good", value: "3" },
    { label: "⭐ 2 - Average", value: "2" },
    { label: "⭐ 1 - Not for me", value: "1" },
  ];

  return (
    <OptionContainer
      label={props.label}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      className={props.className}
      options={ratingOptions}
    />
  );
}

export default RatingOptions;