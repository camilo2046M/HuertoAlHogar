import React, { useState, useMemo,useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. Importa el Provider y el hook
import { AuthProvider, useAuth } from './context/AuthContext';

import Header from "./components/organism/Header";
import Footer from "./components/templates/Footer";
import RegisterPopUp from "./components/organism/RegisterPopUp";
import LoginPopUp from "./components/organism/LoginPopUp";
import Home from "./components/pages/Home";
import Carrito from "./components/pages/Carrito";
import Catalogo from "./components/pages/Catalogo";
import Nosotros from "./components/pages/Nosotros";
import Perfil from "./components/pages/Perfil";
import Checkout from "./components/pages/Checkout";
import Blog from "./components/pages/Blog";
import AuthService from "./services/AuthService";
import PagoExitoso from "./components/pages/PagoExitoso";
import PagoFallido from "./components/pages/PagoFallido";

// Función helper para el precio
const getPrice = (precio) => {
  if (typeof precio === 'number') return precio;
  if (typeof precio === 'string') {
    const cleanPrice = precio.replace('$', '').replace(/\./g, '').replace(',', '.');
    return parseFloat(cleanPrice) || 0;
  }
  return 0;
};

// 👇 2. COMPONENTE INTERNO: Contiene toda la lógica de la app
function HuertoApp() {
  // Usamos el hook del contexto para el usuario
  const { user, login, logout } = useAuth();

  // Estados de UI
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  
  // Estado del Carrito
const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shopping_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cart));
  }, [cart]);
  // --- LÓGICA DEL CARRITO ---
  const handleAddToCart = (productoToAdd) => {
    setCart(prevCart => {
      const existente = prevCart.find(p => p.nombre === productoToAdd.nombre);
      if (existente) {
        return prevCart.map(p => 
          p.nombre === productoToAdd.nombre ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prevCart, { ...productoToAdd, cantidad: 1 }];
      }
    });
  };

  const handleClearCart = () => setCart([]);

  const handleRemoveItem = (productName) => {
    setCart(prevCart => prevCart.filter(item => item.nombre !== productName));
  };

  const handleIncreaseQuantity = (productName) => {
    setCart(prevCart => prevCart.map(item => item.nombre === productName ? { ...item, cantidad: item.cantidad + 1 } : item));
  };

  const handleDecreaseQuantity = (productName) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.nombre === productName);
      if (existingItem.cantidad === 1) return prevCart.filter(item => item.nombre !== productName);
      return prevCart.map(item => item.nombre === productName ? { ...item, cantidad: item.cantidad - 1 } : item);
    });
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (getPrice(item.precio) * item.cantidad), 0);
  }, [cart]);

  // --- LÓGICA DE AUTENTICACIÓN ---
  
  const handleLoginSubmit = async (email, password) => {
    try {
      // 1. Hacemos login y obtenemos el token
      await AuthService.login(email, password); 
      
      // 2. ¡Paso clave! Inmediatamente pedimos los datos del usuario (ID, nombre, etc.)
      const response = await AuthService.getPerfil();
      
      // 3. Actualizamos el contexto con el usuario COMPLETO (que tiene ID)
      login(null, response.data); // El token ya está en localStorage, pasamos null o el token
      
      setIsLoginPopupOpen(false);
      alert(`¡Bienvenido/a, ${response.data.nombre}!`);

    } catch (error) {
      console.error("Error en login:", error);
      alert('Correo o contraseña incorrectos.');
    }
  };

 const handleRegisterSubmit = async (userData) => {
    try {
      await AuthService.register(userData);
      // Auto-login
      const data = await AuthService.login(userData.correo, userData.password);
      login(data.token, data.username);
      setIsPopupOpen(false);
      alert("¡Cuenta creada con éxito!");
    } catch (error) {
      console.error("Error detallado:", error);
      
      // Intentamos extraer el mensaje exacto del backend
      let mensajeError = "Error al registrar.";
      
      if (error.response && error.response.data) {
        // Si el backend envía { "errors": { "password": "..." } }
        if (error.response.data.errors) {
           mensajeError = Object.values(error.response.data.errors).join("\n");
        } 
        // Si el backend envía { "error": "El correo ya existe" }
        else if (error.response.data.error) {
           mensajeError = error.response.data.error;
        }
      }
      
      alert("Atención:\n" + mensajeError);
    }
  };

  // Función dummy para actualizar perfil (por ahora solo loguea)
  const handleUpdateProfile = (newProfileData) => {
    console.log("Perfil actualizado:", newProfileData);
    // Aquí llamarías a AuthService.updateProfile(newProfileData) en el futuro
  };

  return (
    <BrowserRouter>
      <Header 
        onCrearCuentaClick={() => setIsPopupOpen(true)}
        onLoginClick={() => setIsLoginPopupOpen(true)}
        onLogoutClick={logout} // Logout del contexto
        user={user} // User del contexto
      />
      
      <main>
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/catalogo" element={<Catalogo onAddToCart={handleAddToCart} />} />
          <Route path="/carrito" element={
            <Carrito 
              cartItems={cart} 
              cartTotal={cartTotal}
              onClearCart={handleClearCart} 
              onAddToCart={handleAddToCart} 
              onRemoveItem={handleRemoveItem}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
            />
          } />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/perfil" element={
            <Perfil 
              user={user} 
              onUpdateProfile={handleUpdateProfile} 
            />
          } />
          <Route path="/blog" element={<Blog />} />
          <Route path="/checkout" element={
            <Checkout 
              user={user}
              cartItems={cart}
              cartTotal={cartTotal}
              onCheckoutSubmit={handleClearCart} 
            />
          } />        
          <Route 
          path="/pago-exitoso" 
          element={<PagoExitoso onClearCart={handleClearCart} />} 
        />
        <Route 
          path="/pago-fallido" 
          element={<PagoFallido />} 
        />
        </Routes>
      </main>
      
      <Footer />

      {isPopupOpen && <RegisterPopUp onClose={() => setIsPopupOpen(false)} onSubmit={handleRegisterSubmit} />}
      {isLoginPopupOpen && <LoginPopUp onClose={() => setIsLoginPopupOpen(false)} onSubmit={handleLoginSubmit} />}
    </BrowserRouter>
  );
}

// 👇 3. COMPONENTE PRINCIPAL: Solo provee el contexto
function App() {
  return (
    <AuthProvider>
      <HuertoApp />
    </AuthProvider>
  );
}

export default App;