import React, { useState } from 'react';
import Input from '../atoms/Input.jsx';
import Button from '../atoms/Button.jsx';
import styles from '../../styles/RegisterPopUp.module.css';

function RegisterPopUp({ onClose }) {
  
  const [formData, setFormData] = useState({
    nombrePopup: '',
    correoPopup: '',
    passwordPopup: ''
  });

  const [error, setError] = useState(null); 
  const [errorField, setErrorField] = useState(null); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));


    if (id === errorField) {
      if (id === 'nombrePopup' && value.trim().length >= 5) {
        setError(null);
        setErrorField(null);
      }
      if (id === 'correoPopup' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setError(null);
        setErrorField(null);
      }
      if (id === 'passwordPopup' && value.length >= 6) {
        setError(null);
        setErrorField(null);
      }
    }
  };

  const validate = () => {
    const { nombrePopup, correoPopup, passwordPopup } = formData;
    
    if (nombrePopup.trim().length < 5) {
      setError("El nombre debe tener al menos 5 caracteres.");
      setErrorField("nombrePopup");
      return false;
    }
    
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correoPopup)) {
      setError("Correo inválido.");
      setErrorField("correoPopup");
      return false;
    }
    
    if (passwordPopup.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setErrorField("passwordPopup");
      return false;
    }
    
    setError(null);
    setErrorField(null);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (validate()) {
      alert("✅ Formulario enviado correctamente!");
      handleClose(); 
    } else {
      alert("❌ Revisa los campos del formulario.");
    }
  };


  const handleClose = () => {
    setFormData({ nombrePopup: '', correoPopup: '', passwordPopup: '' });
    setError(null);
    setErrorField(null);
    onClose(); 
  };


  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Crear Cuenta</h2>
        
        <form id="formularioPopup" onSubmit={handleSubmit} noValidate>
          
          <Input
            id="nombrePopup"
            placeholder="Nombre de usuario"
            value={formData.nombrePopup}
            onChange={handleChange}
            hasError={errorField === 'nombrePopup'}
          />
          
          <Input
            type="email"
            id="correoPopup"
            placeholder="Correo electrónico"
            value={formData.correoPopup}
            onChange={handleChange}
            hasError={errorField === 'correoPopup'}
          />
          
          <Input
            type="password"
            id="passwordPopup"
            placeholder="Contraseña"
            value={formData.passwordPopup}
            onChange={handleChange}
            hasError={errorField === 'passwordPopup'}
          />
          
          <Button type="submit">
            Registrarse
          </Button>

        </form> 
        
        <div id="erroresPopup" className='error-message-placeholder'>
          {error || null} 
        </div>
        
        <button className={styles.close} onClick={handleClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default RegisterPopUp;