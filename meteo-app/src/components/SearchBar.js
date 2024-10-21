import React from 'react';
import { Button, Form } from 'react-bootstrap';

const SearchBar = ({ city, setCity, handleSearch, handleKeyDown }) => {
  return (
    <div>
      <Form.Control 
        size="lg"
        type="text"
        placeholder="Entrez une ville"
        value={city}  
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
      <Button variant="primary" size="lg" onClick={handleSearch}>
        Rechercher
      </Button>
    </div>
  );
};

export default SearchBar;
