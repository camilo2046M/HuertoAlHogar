import React from "react";
import Button from "../atoms/Button.jsx";


function ProfileInfoDisplay({ user, onEditClick }) {
  const nombre = user?.nombre || "Invitado";
  const correo = user?.correo || "sin correo";
  const direccion = user?.direccion || "No registrada";
  const telefono = user?.telefono || "No registrado";

  return (
    <div className="perfil-info">
      <p><strong>Nombre:</strong> <span id="perfilNombre">{nombre}</span></p>
      <p><strong>Correo:</strong> <span id="perfilCorreo">{correo}</span></p>
      <p><strong>Dirección:</strong> <span id="perfilDireccion">{direccion}</span></p>
      <p><strong>Teléfono:</strong> <span id="perfilTelefono">{telefono}</span></p>
      
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