import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "./CartItem";

describe("CartItem component", () => {
  test("renders product info and handles interactions", () => {
    const mockRemove = jest.fn();
    const mockIncrease = jest.fn();
    const mockDecrease = jest.fn();

    const item = {
      nombre: "Manzanas Fuji",
      precio: 800,
      cantidad: 2,
      imagen: "/images/manzana.jpg",
    };

    render(
      <table>
        <tbody>
          <CartItem
            item={item}
            onRemove={mockRemove}
            onIncrease={mockIncrease}
            onDecrease={mockDecrease}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.getByText("$800")).toBeInTheDocument();

    fireEvent.click(screen.getByText("+"));
    expect(mockIncrease).toHaveBeenCalledWith("Manzanas Fuji");

    fireEvent.click(screen.getByText("-"));
    expect(mockDecrease).toHaveBeenCalledWith("Manzanas Fuji");

    fireEvent.click(screen.getByText("Eliminar"));
    expect(mockRemove).toHaveBeenCalledWith("Manzanas Fuji");
  });
});