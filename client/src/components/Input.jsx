import styles from "./Input.module.css";

function Input(props) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.name}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        autoComplete={props.autoComplete}
      />
      {props.error && <span className={styles.errorText}>{props.error}</span>}
    </div>
  );
}

export default Input;