import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/FilterControls.module.css'; // 👈 Importa los estilos

function FilterControls({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder
}) {
  return (
    // 1. Usa styles.controlsContainer
    <Container className={styles.controlsContainer}>
      <Row className="g-3">
        
        <Col xs={12} md={6}>
          <label htmlFor="search-bar" className={styles.label}>Buscar por nombre</label>
          <input
            id="search-bar"
            type="text"
            className={styles.customInput} // 👈 Aplica la clase personalizada
            placeholder="Ej: Manzana, Miel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>

        <Col xs={12} md={3}>
          <label htmlFor="category-filter" className={styles.label}>Filtrar por Categoría</label>
          <select 
            id="category-filter"
            className={`form-select ${styles.customInput}`} // Combina Bootstrap con tu estilo
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
          <label htmlFor="sort-order" className={styles.label}>Ordenar por</label>
          <select 
            id="sort-order"
            className={`form-select ${styles.customInput}`} // Combina Bootstrap con tu estilo
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