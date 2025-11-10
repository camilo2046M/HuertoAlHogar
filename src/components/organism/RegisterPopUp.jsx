import React, { useState } from 'react';
import Input from '../atoms/Input.jsx';
import Button from '../atoms/Button.jsx';
// Importa los estilos (asegúrate que la ruta sea correcta, ej: ./RegisterPopUp.module.css)
import styles from '../../styles/RegisterPopUp.module.css'; 

// 1. Asegúrate de que acepta 'onSubmit' y 'onClose'
function RegisterPopUp({ onClose, onSubmit }) { 
  
  const [formData, setFormData] = useState({
    nombre: '', // (Debe ser 'nombre', 'correo', 'password')
    correo: '',
    password: ''
  });

  // 2. Este es el handler para los inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  // 3. ¡ESTA ES LA LÓGICA CLAVE!
  // Llama a la función 'onSubmit' de App.jsx
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // Aquí es donde contacta al backend (vía App.jsx)
    onSubmit(formData); 
    
    // NO hay alerta de "éxito" aquí. App.jsx se encarga de eso.
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
        
        {/* Usamos el 'onClose' que nos pasó App.jsx */}
        <button className={styles.close} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default RegisterPopUp;