import React, { useState } from 'react';
import ProfileInfoDisplay from '../molecules/ProfileInfoDisplay.jsx';
import ProfileEditForm from '../molecules/ProfileEditForm.jsx';

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
    <section className="perfil-seccion">
      <h2 className="seccion-titulo">Mi Perfil</h2>
      
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