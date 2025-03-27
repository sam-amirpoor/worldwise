import styles from "./Button.module.css";

function Button({ onClick, type, children }) {
  return (
    <button
      className={`${styles[type]} ${styles.btn}`}
      onClick={(e) => onClick && onClick(e)}
    >
      {children}
    </button>
  );
}

export default Button;
