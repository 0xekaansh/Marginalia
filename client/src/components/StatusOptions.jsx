import OptionContainer from "./OptionContainer";

function StatusOptions(props) {
  const statusOptions = [
    { label: "Plan to read", value: "planToRead" },
    { label: "Completed", value: "completed" },
    { label: "Reading", value: "reading" },
    { label: "On-Hold", value: "onHold" },
    { label: "Dropped", value: "dropped" },
  ];

  return (
    <OptionContainer
      label={props.label}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      className={props.className}
      options={statusOptions}
    />
  );
}

export default StatusOptions;
