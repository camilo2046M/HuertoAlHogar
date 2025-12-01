import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService, { logout as logoutService, getRole } from '../services/AuthService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga para evitar parpadeos

    // 1. EFECTO DE INICIALIZACIÓN
  useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await AuthService.getPerfil();
                    setIsAuth(true);
                    setUser(response.data);
                    // 👇 2. Recuperar rol del storage al recargar
                    setRole(getRole()); 
                } catch (error) {
                    logoutService();
                    setIsAuth(false);
                    setUser(null);
                    setRole(null);
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

 const login = (token, userData, userRole) => {
        setIsAuth(true);
        setUser(userData);
        setRole(userRole); // Guardar en estado
    };

    const logout = () => {
        logoutService();
        setIsAuth(false);
        setUser(null);
        setRole(null); // Limpiar estado
        window.location.href = '/';
    };

    // Mostrar cargando mientras verificamos sesión
    if (loading) {
        return <div style={{ padding: "50px", textAlign: "center" }}>Cargando sesión...</div>;
    }

    return (
        // 👇 4. Pasar 'role' en el value
        <AuthContext.Provider value={{ isAuth, user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);