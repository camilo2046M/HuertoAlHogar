import React from 'react';
import styles from '../../styles/Input.module.css';

function Input({ id, placeholder, value, onChange, hasError, type = "text"}) {
  

  const inputClassName = `${styles.input} ${hasError ? styles.error : ''}`;

  return (
    <input
      type={type}
      id={id}
      name={id} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={inputClassName}
      required 
    />
  );
}

export default Input;