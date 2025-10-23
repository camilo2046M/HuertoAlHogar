import React from 'react';
import Input from '../atoms/Input'; 
import Container from 'react-bootstrap/Container'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function FilterControls({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder
}) {
  return (
    <Container className="py-3" style={{ backgroundColor: '#fdfdfd', borderRadius: '8px', marginBottom: '2rem' }}>
      <Row className="g-3"> 
        
        <Col xs={12} md={6}>
          <label htmlFor="search-bar" className="form-label">Buscar por nombre</label>
          <Input
            id="search-bar"
            placeholder="Ej: Manzana, Miel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>

        <Col xs={12} md={3}>
          <label htmlFor="category-filter" className="form-label">Filtrar por Categoría</label>
          <select 
            id="category-filter"
            className="form-select" 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas las categorías</option>
            <option value="frutas">Frutas</option>
            <option value="verduras">Verduras</option>
            <option value="organicos">Orgánicos</option>
            <option value="lacteos">Lácteos</option>
          </select>
        </Col>

        <Col xs={12} md={3}>
          <label htmlFor="sort-order" className="form-label">Ordenar por</label>
          <select 
            id="sort-order"
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Por defecto</option>
            <option value="price-asc">Precio (menor a mayor)</option>
            <option value="price-desc">Precio (mayor a menor)</option>
          </select>
        </Col>

      </Row>
    </Container>
  );
}

export default FilterControls;