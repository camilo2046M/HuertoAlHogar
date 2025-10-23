import React, { useState } from 'react';
import Input from '../atoms/Input.jsx';
import Button from '../atoms/Button.jsx';
import styles from '../../styles/RegisterPopUp.module.css'; 


function LoginPopUp({ onSubmit, onClose }) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmit} noValidate>
          <Input
            type="email"
            id="emailLogin"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Input
            type="password"
            id="passwordLogin"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button type="submit">
            Ingresar
          </Button>
        </form>
        
        <button className={styles.close} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default LoginPopUp;