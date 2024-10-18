import React, { useEffect, useState } from 'react';
import { useParams, Link  } from 'react-router-dom';

import { Button } from 'react-bootstrap';

const CocktailDetail = () => {
  const { id } = useParams(); // Récupère l'ID du cocktail via l'URL
  const [cocktail, setCocktail] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // État pour vérifier si c'est un favori

  const checkIfFavorite = (cocktailName) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return existingFavorites.includes(cocktailName);
  };

  const addToFavorites = () => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = [...existingFavorites, cocktail.strDrink];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(true); // Met à jour l'état des favoris
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
      setIsFavorite(checkIfFavorite(fetchedCocktail.strDrink)); // Vérifie si c'est un favori
    };
    fetchCocktailDetail();
  }, [id]);

  if (!cocktail) return <div>Chargement...</div>;

  return (
    <div>
      <h1>{cocktail.strDrink}</h1>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width="300" />
      <p>{cocktail.strInstructions}</p>
      <Button variant="secondary" onClick={isFavorite ? removeFromFavorites : addToFavorites}>
        {isFavorite ? 'Retirer des Favoris' : 'Ajouter aux Favoris'}
      </Button>
      <h3>Ingrédients</h3>
      <ul>
        {Object.keys(cocktail)
          .filter((key) => key.startsWith('strIngredient') && cocktail[key])
          .map((ingredientKey, index) => (
            <li key={index}>
              <Link to={`/ingredients/${cocktail[ingredientKey]}`}>
                {cocktail[ingredientKey]}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CocktailDetail;
