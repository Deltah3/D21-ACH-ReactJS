import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 

import { Card, Row, Col, Image } from 'react-bootstrap';

const CocktailsByIngredient = () => {
  const { ingredient } = useParams();
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCocktailsByIngredient = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      if (data.drinks) {
        setCocktails(data.drinks);
      }
      setLoading(false);
    };

    fetchCocktailsByIngredient();
  }, [ingredient]);

  if (loading) {
    return <div>Chargement des cocktails...</div>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Cocktails contenant {ingredient}</h1>
      <Row>
        {cocktails.map((cocktail) => (
          <Col key={cocktail.idDrink} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Link className="link" to={`/cocktail/${cocktail.idDrink}`}>
              <Card className="rounded-card border-light h-100">
                <Image variant="top" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} roundedCircle />
                <Card.Title>{cocktail.strDrink}</Card.Title>
                <Card.Body>
                  Voir
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CocktailsByIngredient;
