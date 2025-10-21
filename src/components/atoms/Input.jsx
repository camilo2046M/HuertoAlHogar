import React from "react";

function Input({ id, placeholder, value, onChange, hasError, type = "text" }) {
  return (
    <input
      type={type}
      id={id}
      name={id} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={hasError ? "error" : ""} 
      required 
    />
  );
}

export default Input;