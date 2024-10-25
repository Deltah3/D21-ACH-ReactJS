import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Favorites = () => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  return (
    <Container>
      <h1 style={{ marginBottom: '30px' }}>Mes Cocktails Favoris</h1>
      {favorites.length === 0 ? (
        <p>Aucun cocktail ajouté aux favoris.</p>
      ) : (
        <Row>
          {favorites.map((cocktail) => (
            <Col xs={12} sm={6} md={4} lg={3} key={cocktail.id} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={cocktail.image} alt={cocktail.name} />
                <Card.Body>
                  <Card.Title>
                    <Link className="link" to={`/cocktail/${cocktail.id}`}>
                      {cocktail.name}
                    </Link>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favorites;