import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductosDisponibles from "./ProductosDisponibles";

test("ProductosDisponibles component › renders products and handles add-to-cart", () => {
  const mockAddToCart = jest.fn();

  const productos = [
    { nombre: "Manzana", precio: "$500 / kg", imagen: "/images/manzana.jpg" },
    { nombre: "Miel", precio: "$1.000 / frasco", imagen: "/images/miel.jpg" },
    { nombre: "Leche", precio: "$1.200 / litro", imagen: "/images/leche.jpg" },
  ];

  render(<ProductosDisponibles productos={productos} onAddToCart={mockAddToCart} />);

  expect(screen.getByText("Productos Disponibles")).toBeInTheDocument();

  expect(
    screen.getByText((content) => content.includes("Manzana") && content.includes("$500 / kg"))
  ).toBeInTheDocument();

  expect(
    screen.getByText((content) => content.includes("Miel") && content.includes("$1.000 / frasco"))
  ).toBeInTheDocument();

  expect(
    screen.getByText((content) => content.includes("Leche") && content.includes("$1.200 / litro"))
  ).toBeInTheDocument();

  fireEvent.click(screen.getAllByText("Agregar al carrito")[1]);
  expect(mockAddToCart).toHaveBeenCalledWith(productos[1]);
});