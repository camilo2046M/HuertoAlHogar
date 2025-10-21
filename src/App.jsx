import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/organism/Header";
import Footer from "./components/templates/Footer";
import RegisterPopUp from "./components/organism/RegisterPopUp";

import Home from "./components/pages/Home";
import Carrito from "./components/pages/Carrito";
import Catalogo from "./components/pages/Catalogo";
import Nosotros from "./components/pages/Nosotros";
import Perfil from "./components/pages/Perfil";


const DUMMY_USER_DATA = {
  nombre: "Ana Martínez",
  correo: "ana.martinez@email.com",
  direccion: "Av. Siempre Viva 123, Santiago",
  telefono: "+56 9 1234 5678"
};

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const [cart, setCart] = useState([]); 


  const handleAddToCart = (productoToAdd) => {
    setCart(prevCart => {
      const existente = prevCart.find(p => p.nombre === productoToAdd.nombre);
      
      if (existente) {
        return prevCart.map(p => 
          p.nombre === productoToAdd.nombre 
            ? { ...p, cantidad: p.cantidad + 1 } 
            : p
        );
      } else {
        return [...prevCart, { ...productoToAdd, cantidad: 1 }];
      }
    });
    console.log("Producto agregado:", productoToAdd);
  };


  const handleClearCart = () => {
    setCart([]); 
  };
  

  const [currentUser, setCurrentUser] = useState(DUMMY_USER_DATA); 

  const handleUpdateProfile = (newProfileData) => {
    setCurrentUser(newProfileData);
 
    console.log("Perfil actualizado:", newProfileData);
  };

  return (
    <BrowserRouter>

      <Header onCrearCuentaClick={handleOpenPopup} 
        user={currentUser}/>

      <main>
        <Routes>
          <Route 
            path="/" 
            element={<Home onAddToCart={handleAddToCart} />} 
          />
          <Route 
            path="/catalogo" 
            element={<Catalogo onAddToCart={handleAddToCart} />} 
          />
          <Route 
            path="/catalogo" 
            element={<h1>Página Catálogo (WIP)</h1> }
          />
          <Route 
            path="/carrito" 
            element={
              <Carrito 
                cartItems={cart} 
                onClearCart={handleClearCart} 
                onAddToCart={handleAddToCart} 
              />
            } 
          />
          <Route 
            path="/nosotros" 
            element={<Nosotros />} 
          />
          <Route 
            path="/perfil" 
            element={
              <Perfil 
                user={currentUser} 
                onUpdateProfile={handleUpdateProfile} 
              />
            } 
          />        
          </Routes>
      </main>
      
      <Footer />

      {isPopupOpen && <RegisterPopUp onClose={handleClosePopup} />}
    </BrowserRouter>
  );
}

export default App;