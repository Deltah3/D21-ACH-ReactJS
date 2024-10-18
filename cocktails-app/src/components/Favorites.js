import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  return (
    <div>
      <h1>Mes Cocktails Favoris</h1>
      {favorites.length === 0 ? (
        <p>Aucun cocktail ajouté aux favoris.</p>
      ) : (
        <ul>
          {favorites.map((cocktail, index) => (
            <li key={index}>
              <Link className="link" to={`/cocktail/${cocktail}`}>{cocktail}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
