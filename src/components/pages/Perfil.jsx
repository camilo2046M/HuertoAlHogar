import React from "react";
import ProfileSection from "../organism/ProfileSection.jsx";

function Perfil({ user, onUpdateProfile }) {
  return (
    <>
      <ProfileSection 
        user={user} 
        onUpdateProfile={onUpdateProfile} 
      />
    </>
  );
}

export default Perfil;