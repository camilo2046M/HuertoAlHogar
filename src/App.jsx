import React, { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/organism/Header";
import Footer from "./components/templates/Footer";
import RegisterPopUp from "./components/organism/RegisterPopUp";
import Home from "./components/pages/Home";
import Carrito from "./components/pages/Carrito";
import Catalogo from "./components/pages/Catalogo";
import Nosotros from "./components/pages/Nosotros";
import Perfil from "./components/pages/Perfil";
import Checkout from "./components/pages/Checkout";
import LoginPopUp from "./components/organism/LoginPopUp";
import AuthService from "./services/AuthService";
import Blog from "./components/pages/Blog";




const getPrice = (precio) => {
  
  if (typeof precio === 'number') {
    return precio; 
  }

  if (typeof precio === 'string') {
    const cleanPrice = precio
      .replace('$', '')
      .replace(/\./g, '') 
      .replace(',', '.'); 
    
    return parseFloat(cleanPrice) || 0; 
  }

  return 0;
};

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const handleOpenLoginPopup = () => setIsLoginPopupOpen(true);
  const handleCloseLoginPopup = () => setIsLoginPopupOpen(false);

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
  

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (getPrice(item.precio) * item.cantidad), 0);
  }, [cart]);

  const [currentUser, setCurrentUser] = useState(null); 

  const handleUpdateProfile = (newProfileData) => {
    setCurrentUser(newProfileData);
 
    console.log("Perfil actualizado:", newProfileData);
  };

const handleLogin = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      
      const usuarioLogueado = response.data;
      
      setCurrentUser(usuarioLogueado); 
      setIsLoginPopupOpen(false); 
      alert(`¡Bienvenido/a, ${usuarioLogueado.nombre}!`);

    } catch (error) {
      console.error("Error en el login:", error);
      alert('Correo o contraseña incorrectos.');
    }
  };

  const handleRegister = async (usuarioData) => {
    try {
      const response = await AuthService.register(usuarioData);
      
      const usuarioNuevo = response.data;

      setCurrentUser(usuarioNuevo);
      setIsPopupOpen(false); 
      alert(`¡Registro exitoso! Bienvenido/a, ${usuarioNuevo.nombre}`);

    } catch (error) {
      console.error("Error en el registro:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errores = Object.values(error.response.data.errors).join("\n");
        alert(`Error en el registro:\n${errores}`);
      } else {
        alert('Error en el registro. Inténtalo de nuevo.');
      }
    }
  };


const handleLogout = () => {
    setCurrentUser(null); 
    alert('Sesión cerrada.');
  };

  const handleRemoveItem = (productName) => {
    setCart(prevCart => 
      prevCart.filter(item => item.nombre !== productName)
    );
  };

  const handleIncreaseQuantity = (productName) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.nombre === productName 
          ? { ...item, cantidad: item.cantidad + 1 } 
          : item
      )
    );
  };

  const handleDecreaseQuantity = (productName) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.nombre === productName);

      if (existingItem.cantidad === 1) {
        return prevCart.filter(item => item.nombre !== productName);
      }
      
      return prevCart.map(item =>
        item.nombre === productName
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      );
    });
  };

  return (
    <BrowserRouter>

      <Header 
        onCrearCuentaClick={handleOpenPopup} 
        onLoginClick={handleOpenLoginPopup} 
        onLogoutClick={handleLogout}
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
        path="/carrito" 
        element={
          <Carrito 
            cartItems={cart} 
            onClearCart={handleClearCart} 
            onAddToCart={handleAddToCart} 
            onRemoveItem={handleRemoveItem}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            cartTotal={cartTotal}
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
          <Route path="/blog" element={<Blog />} />
          <Route 
          path="/checkout"
          element={
            <Checkout 
              user={currentUser}     // 👈 Pasa el objeto usuario completo
              cartItems={cart}       // 👈 Pasa los items del carrito
              cartTotal={cartTotal}
              onCheckoutSubmit={handleClearCart} 
            />
            } 
          />        
          
          </Routes>
          
      </main>
      
      <Footer />

{isPopupOpen && <RegisterPopUp 
        onClose={handleClosePopup} 
        onSubmit={handleRegister} 
      />}
      
      {isLoginPopupOpen && <LoginPopUp 
        onSubmit={handleLogin} 
        onClose={handleCloseLoginPopup} 
      />}
    </BrowserRouter>
  );
}

export default App;