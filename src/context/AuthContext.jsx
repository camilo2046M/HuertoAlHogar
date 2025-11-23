import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService, { logout as logoutService } from '../services/AuthService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga para evitar parpadeos

    // 1. EFECTO DE INICIALIZACIÓN
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            
            if (token) {
                try {
                    // 👇 LLAMADA DE VERIFICACIÓN
                    // Pedimos los datos reales al backend. Si el token es inválido, esto fallará.
                    const response = await AuthService.getPerfil();
                    
                    setIsAuth(true);
                    setUser(response.data); // ¡Aquí viene el usuario COMPLETO con ID!
                } catch (error) {
                    console.error("Sesión inválida o expirada:", error);
                    // Si falla, limpiamos todo
                    logoutService();
                    setIsAuth(false);
                    setUser(null);
                }
            }
            setLoading(false); // Terminamos de cargar
        };

        initAuth();
    }, []);

    const login = (token, userData) => {
        setIsAuth(true);
        setUser(userData);
    };

    const logout = () => {
        logoutService();
        setIsAuth(false);
        setUser(null);
        window.location.href = '/'; // Redirigir al inicio
    };

    // Mostrar cargando mientras verificamos sesión
    if (loading) {
        return <div style={{ padding: "50px", textAlign: "center" }}>Cargando sesión...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuth, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);