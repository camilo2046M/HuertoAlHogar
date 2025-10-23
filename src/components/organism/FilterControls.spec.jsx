import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterControls from "./FilterControls";

test("FilterControls component › handles input and selects", () => {
  const setSearchTerm = jest.fn();
  const setSelectedCategory = jest.fn();
  const setSortOrder = jest.fn();

  render(
    <FilterControls
      searchTerm=""
      setSearchTerm={setSearchTerm}
      selectedCategory="all"
      setSelectedCategory={setSelectedCategory}
      sortOrder="default"
      setSortOrder={setSortOrder}
    />
  );

  fireEvent.change(screen.getByPlaceholderText("Ej: Manzana, Miel..."), {
    target: { value: "Miel" },
  });
  expect(setSearchTerm).toHaveBeenCalledWith("Miel");

  fireEvent.change(screen.getByLabelText("Filtrar por Categoría"), {
    target: { value: "organicos" },
  });
  expect(setSelectedCategory).toHaveBeenCalledWith("organicos");

  fireEvent.change(screen.getByLabelText("Ordenar por"), {
    target: { value: "price-desc" },
  });
  expect(setSortOrder).toHaveBeenCalledWith("price-desc");
});