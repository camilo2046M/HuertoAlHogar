// src/components/molecules/ProfileEditForm.jsx
import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import styles from '../../styles/ProfileEditForm.module.css';

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
    <form className={styles.perfilForm} onSubmit={handleSubmit}>
      <div className="mb-3"> 
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <Input
          id="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
       <div className="mb-3">
         <label htmlFor="correo" className="form-label">Correo</label>
        <Input
          id="correo"
          type="email"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
        />
      </div>
       <div className="mb-3">
         <label htmlFor="direccion" className="form-label">Dirección</label>
        <Input
          id="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
        />
      </div>
       <div className="mb-3">
         <label htmlFor="telefono" className="form-label">Teléfono</label>
        <Input
          id="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formActions}>
        <Button type="submit" className="btn"> 
          Guardar Cambios
        </Button>
        <Button type="button" className="secondary" onClick={onCancel}> 
          Cancelar
        </Button>
      </div>
    </form>
  );
}

export default ProfileEditForm;