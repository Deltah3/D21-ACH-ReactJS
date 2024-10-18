import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Utiliser useParams pour obtenir l'ingrédient

import { Card, Row, Col } from 'react-bootstrap'; // Utilisation de Bootstrap pour le style

const CocktailsByIngredient = () => {
  const { ingredient } = useParams(); // Obtenir l'ingrédient à partir de l'URL
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
  }, [ingredient]); // Exécuter lorsque l'ingrédient change

  if (loading) {
    return <div>Chargement des cocktails...</div>;
  }

  return (
    <div>
      <h1>Cocktails contenant {ingredient}</h1>
      <Row>
        {cocktails.map((cocktail) => (
          <Col key={cocktail.idDrink} xs={12} sm={6} md={4} lg={2} className="mb-4">
            <Card border="light">
              <Card.Img variant="top" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <Card.Body>
                <Card.Title>{cocktail.strDrink}</Card.Title>
                <Link to={`/cocktail/${cocktail.idDrink}`}>Voir</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CocktailsByIngredient;
