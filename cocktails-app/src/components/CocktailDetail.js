import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, ListGroup, Image } from 'react-bootstrap';

const CocktailDetail = () => {
  const { id } = useParams(); 
  const [cocktail, setCocktail] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); 

  const checkIfFavorite = (cocktailName) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return existingFavorites.includes(cocktailName);
  };

  const addToFavorites = () => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = [
      ...existingFavorites,
      { id: cocktail.idDrink, name: cocktail.strDrink, image: cocktail.strDrinkThumb }
    ];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(true);
    alert(`${cocktail.strDrink} ajouté aux favoris !`);
  };
  

  const removeFromFavorites = () => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = existingFavorites.filter(
      (favorite) => favorite !== cocktail.strDrink
    );
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(false);
    alert(`${cocktail.strDrink} retiré des favoris !`);
  };

  useEffect(() => {
    const fetchCocktailDetail = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      const fetchedCocktail = data.drinks[0];
      setCocktail(fetchedCocktail);
      setIsFavorite(checkIfFavorite(fetchedCocktail.strDrink)); 
    };
    fetchCocktailDetail();
  }, [id]);

  if (!cocktail) return <div>Chargement...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>{cocktail.strDrink}</h1>
      <div className="cocktail-details mb-4">
        <div className="cocktail-image">
          <img
            style={{ width: '50%', height: 'auto', objectFit: 'cover' }}
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            className='rounded-circle'
          />
        </div>
        <div className="cocktail-info">
          <h2 style={{ marginBottom: '30px' }}>Ingrédients</h2>
          <ListGroup variant="flush">
            {Object.keys(cocktail)
              .filter((key) => key.startsWith('strIngredient') && cocktail[key])
              .map((ingredientKey, index) => {
                const ingredientName = cocktail[ingredientKey];
                const ingredientImageUrl = `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`;

                return (
                  <ListGroup.Item key={index} className="d-flex align-items-center">
                    <Image
                      src={ingredientImageUrl}
                      alt={ingredientName}
                      width={50}
                      height={50}
                      className="mr-3"
                    />
                    <Link to={`/ingredients/${ingredientName}`}>
                      {ingredientName}
                    </Link>
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
          <h3 style={{ marginTop: '30px', marginBottom: '50px' }}>Instructions</h3>
          <p>{cocktail.strInstructions}</p>
        </div>
      </div>
      <Button variant="secondary" onClick={isFavorite ? removeFromFavorites : addToFavorites}>
              {isFavorite ? 'Retirer des Favoris' : 'Ajouter aux Favoris'}
      </Button>
    </div>
  );
};

export default CocktailDetail;
