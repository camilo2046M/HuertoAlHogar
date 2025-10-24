import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input component", () => {
  test("renders with correct placeholder and handles input", () => {
    const handleChange = jest.fn();

    render(
      <Input
        type="text"
        placeholder="Buscar producto"
        value=""
        onChange={handleChange}
        name="search"
        id="search"
      />
    );

    const input = screen.getByPlaceholderText("Buscar producto");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Tomate" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});