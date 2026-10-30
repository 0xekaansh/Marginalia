import styles from "./LoadingSpinner.module.css";

function LoadingSpinner({className}) {
  return (
    <div className={`${styles.loaderContainer} ${className || ""}`} >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50" className={styles.spinner}>
        <circle cx="50" cy="50" r="38" fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle 
          cx="50" cy="50" r="38" 
          fill="none" 
          stroke="#4f46e5" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeDasharray="150" 
          strokeDashoffset="100" 
        />
      </svg>
    </div>
  );
}

export default LoadingSpinner;