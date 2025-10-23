import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  test("renders with correct text and handles click", () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Agregar</Button>);

    const button = screen.getByText("Agregar");
    expect(screen.getByText("Agregar")).toBeInTheDocument();


    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});