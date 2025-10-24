import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CartSection from "./CartSection";

test("CartSection component › renders cart items and handles actions", () => {
  const mockClearCart = jest.fn();
  const mockAddToCart = jest.fn();
  const mockRemove = jest.fn();
  const mockIncrease = jest.fn();
  const mockDecrease = jest.fn();

  const cartItems = [
    {
      nombre: "Manzanas Fuji",
      precio: 800,
      cantidad: 2,
      imagen: "/images/manzana.jpg",
    },
  ];

  render(
    <MemoryRouter>
      <CartSection
        cartItems={cartItems}
        cartTotal={1600}
        onClearCart={mockClearCart}
        onAddToCart={mockAddToCart}
        onRemoveItem={mockRemove}
        onIncreaseQuantity={mockIncrease}
        onDecreaseQuantity={mockDecrease}
      />
    </MemoryRouter>
  );

  expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
  expect(screen.getByText("$800")).toBeInTheDocument();
  expect(screen.getByText("1600")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Vaciar Carrito"));
  expect(mockClearCart).toHaveBeenCalledTimes(1);

  expect(screen.getByText("Finalizar Compra")).toBeInTheDocument();
});