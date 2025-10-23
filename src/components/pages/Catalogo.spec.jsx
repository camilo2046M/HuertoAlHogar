import React from "react";
import { render, screen } from "@testing-library/react";
import Catalogo from "./Catalogo";
import { MemoryRouter } from "react-router-dom";

describe("Catalogo component", () => {
  test("renders product names", () => {
    render(
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    );

    expect(screen.getByText(/Manzanas Fuji/i)).toBeInTheDocument();
  });
});