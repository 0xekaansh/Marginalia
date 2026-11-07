import styles from "./OptionContainer.module.css";

function OptionContainer(props) {
  
  return (
    <div className={`${styles.Container} ${props.className || ""}`}>
      <label htmlFor={props.id}>{props.label} : </label>
      <select
        id={props.id}
        value={props.sortOrder}
        onChange={props.onChange}
      >
        {props.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default OptionContainer;
