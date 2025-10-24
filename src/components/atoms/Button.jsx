import React from "react";
import styles from '../../styles/Button.module.css';

function Button({ children, onClick, className = '', type = "button" }) {

const combinedClassName = `${styles.btn} ${
    className
      .split(' ') 
      .map(cls => styles[cls] || cls)
      .join(' ') 
  }`;

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
    >

      {children} 
    </button>
  );
}

export default Button;