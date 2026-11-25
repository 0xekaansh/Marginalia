import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function DropdownMenu({
  isOpen,
  onToggle,
  onClose,
  triggerContent,
  items,
  extraClassName = "",
  menuRef,
}) {
  return (
    <div
      className={`${styles.dropDown} ${extraClassName}`}
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={styles.dropDownToggle}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        {triggerContent}
      </button>

      <div
        className={`${styles.dropDownMenu} ${isOpen ? styles.dropDownMenuOpen : ""}`}
      >
        {items.map((item) =>
          item.to ? (
            <Link
              key={item.label}
              to={item.to}
              className={`${styles.navLink} ${item.className || ""}`}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className={`${styles.navLink} ${item.className || ""}`}
            >
              {item.label}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

export default DropdownMenu;
