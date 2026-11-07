import OptionContainer from "./OptionContainer";
import styles from "./SortContainer.module.css";

function SortContainer(props) {
  return (
    <div className={styles.gridHeader}>
      <div className={styles.loadingWrapper}>
        {props.loading && <p>Loading books...</p>}
      </div>
      <OptionContainer
        label={props.label}
        id="sortSelect"
        value={props.sortOrder}
        onChange={props.handleChange}
        options={props.options}
      />
    </div>
  );
}

export default SortContainer;
