import styles from "./SortContainer.module.css";

function SortContainer(props) {
  return (
    <div className={styles.gridHeader}>
      <div className={styles.loadingWrapper}>
        {props.loading && <p>Loading books...</p>}
      </div>
      <div className={styles.sortContainer}>
        <label htmlFor="sortSelect">Sort by: </label>
        <select
          id="sortSelect"
          value={props.sortOrder}
          onChange={props.handleChange}
          className={styles.sortSelect}
        >
          {props.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SortContainer;
