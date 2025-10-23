import React from "react";
import { render, screen } from "@testing-library/react";
import StarRating from "./StarRating";

describe("StarRating component", () => {
  test("renders 5 stars and review count", () => {
    const { container } = render(<StarRating rating={3.5} reviewCount={12} />);

    // Cuenta los íconos SVG renderizados
    const stars = container.querySelectorAll("svg");
    expect(stars.length).toBe(5);

    // Verifica que se muestra el contador de reseñas
    expect(screen.getByText("(12)")).toBeInTheDocument();
  });
});