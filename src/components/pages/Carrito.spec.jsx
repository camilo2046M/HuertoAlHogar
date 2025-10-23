import { render, screen } from "@testing-library/react";
import Carrito from "./Carrito"; // ajusta la ruta si es necesario
import { MemoryRouter } from "react-router-dom";
import React from "react";

describe("Carrito component", () => {
  test("renders a product name", () => {
    const mockAddToCart = jest.fn();
    const mockRemoveFromCart = jest.fn();
    const mockClearCart = jest.fn();
    const mockUpdateQuantity = jest.fn();

    const cartItems = [
      { nombre: "nombre1", precio: 999, cantidad: 2, imagen: "/images/imagenuno.jpg" },
    ];

    const cartTotal = 1998;

    render(
      <MemoryRouter>
        <Carrito
          cartItems={cartItems}
          cartTotal={cartTotal}
          addToCart={mockAddToCart}
          removeFromCart={mockRemoveFromCart}
          clearCart={mockClearCart}
          updateQuantity={mockUpdateQuantity}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("nombre1")).toBeInTheDocument();
  });
});