import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";

describe("ProductCard component", () => {
  test("renders product info and handles add-to-cart", () => {
    const mockAddToCart = jest.fn();

    const producto = {
      imagenSrc: "/images/manzana.jpg",
      nombre: "Manzanas Fuji",
      origen: "Melipilla",
      precio: "$800",
      descripcion: "Manzanas dulces y crujientes",
      disponibilidad: "Disponible",
      rating: 4.5,
      reviewCount: 12,
    };

    render(<ProductCard producto={producto} onAddToCart={mockAddToCart} />);

    expect(screen.getByAltText("Manzanas Fuji")).toHaveAttribute("src", "/images/manzana.jpg");
    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.getByText("Origen: Melipilla")).toBeInTheDocument();
    expect(screen.getByText("$800")).toBeInTheDocument();
    expect(screen.getByText("Manzanas dulces y crujientes")).toBeInTheDocument();
    expect(screen.getByText("Disponible")).toBeInTheDocument();
    expect(screen.getByText("(12)")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Agregar al carrito"));
    expect(mockAddToCart).toHaveBeenCalledWith(producto);
  });
});