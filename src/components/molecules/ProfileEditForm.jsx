// src/components/molecules/ProfileEditForm.jsx

import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

function ProfileEditForm({ user, onSave, onCancel }) {
  
  const [formData, setFormData] = useState({
    nombre: user.nombre || '',
    correo: user.correo || '',
    direccion: user.direccion || '',
    telefono: user.telefono || ''
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
    onSave(formData); 
  };

  return (
    <form className="perfil-form" onSubmit={handleSubmit}>
      <Input
        id="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
      />
      <Input
        id="correo"
        type="email"
        placeholder="Correo"
        value={formData.correo}
        onChange={handleChange}
      />
      <Input
        id="direccion"
        placeholder="Dirección"
        value={formData.direccion}
        onChange={handleChange}
      />
      <Input
        id="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
      />
      
      <div className="form-actions">
        <Button type="submit" className="btn">
          Guardar Cambios
        </Button>
        <Button type="button" className="btn secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

export default ProfileEditForm;