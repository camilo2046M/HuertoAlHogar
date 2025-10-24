import React, { useState } from 'react';
import ProfileInfoDisplay from '../molecules/ProfileInfoDisplay';
import ProfileEditForm from '../molecules/ProfileEditForm';
import styles from '../../styles/ProfileSection.module.css';


function ProfileSection({ user, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newProfileData) => {
    onUpdateProfile(newProfileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <section className={styles.perfilSeccion}>
      <h2 className={styles.seccionTitulo}>Mi Perfil</h2>

      {isEditing ? (
        <ProfileEditForm
          user={user}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <ProfileInfoDisplay
          user={user}
          onEditClick={handleEdit}
        />
      )}
    </section>
  );
}

export default ProfileSection;