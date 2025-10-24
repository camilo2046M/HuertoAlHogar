import React from 'react';
import Button from '../atoms/Button';
import styles from '../../styles/ProfileInfoDisplay.module.css';


function ProfileInfoDisplay({ user, onEditClick }) {
  const nombre = user?.nombre || "Invitado";
  const correo = user?.correo || "sin correo";
  const direccion = user?.direccion || "No registrada";
  const telefono = user?.telefono || "No registrado";

  return (
    <div className={styles.perfilInfo}>
      <p><strong>Nombre:</strong> <span>{nombre}</span></p>
      <p><strong>Correo:</strong> <span>{correo}</span></p>
      <p><strong>Dirección:</strong> <span>{direccion}</span></p>
      <p><strong>Teléfono:</strong> <span>{telefono}</span></p>
      
      {user && (
        <Button className="btn" onClick={onEditClick}> 
          Editar Perfil
        </Button>
      )}
      
      {!user && (
        <Button className="btn" onClick={() => alert('Ir a Login')}> 
          Iniciar Sesión
        </Button>
      )}
    </div>
  );
}

export default ProfileInfoDisplay;