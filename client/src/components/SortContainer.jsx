import OptionContainer from "./OptionContainer";
import styles from "./SortContainer.module.css";
import LoadingSpinner from "../assets/LoadingSpinner"

function SortContainer(props) {
  return (
    <div className={styles.sortContainer}>
      <div className={styles.loadingWrapper}>
        {props.loading && <LoadingSpinner className={styles.spinner}/>}
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
