import React, { useState } from 'react';
import Input from '../atoms/Input.jsx';
import Button from '../atoms/Button.jsx';
import styles from '../../styles/RegisterPopUp.module.css'; 

function RegisterPopUp({ onClose, onSubmit }) { 
  
  const [formData, setFormData] = useState({
    nombre: '', 
    correo: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    onSubmit(formData); 
    
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Crear Cuenta</h2>
        
        <form onSubmit={handleSubmit} noValidate>
          
          <Input
            id="nombre"
            placeholder="Nombre de usuario"
            value={formData.nombre}
            onChange={handleChange}
          />
          <Input
            type="email"
            id="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
          />
          <Input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
          
          <Button type="submit">
            Registrarse
          </Button>
        </form>
        
        
        <button className={styles.close} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default RegisterPopUp;