function Input(props) {
  return (
    <div>
      <label htmlFor={props.type}>{props.label}</label>
      <input
        id={props.name}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.error && <span>{props.error}</span>}
    </div>
  );
}

export default Input;
