import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Form, Button, Image } from 'react-bootstrap';

const CocktailList = () => {
    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all'); // Type de filtre : lettre, ingrédient, etc.
    const [filterValue, setFilterValue] = useState('');  // Valeur spécifique du filtre (lettre, ingrédient, etc.)

    // Fonction pour récupérer tous les cocktails par défaut
    const fetchAllCocktails = async () => {
        const allCocktails = [];
        const letters = 'abcdefghijklmnopqrstuvwxyz'; // Toutes les lettres
        for (const letter of letters) {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
            const data = await response.json();
            if (data.drinks) {
                allCocktails.push(...data.drinks);
            }
        }
        setCocktails(allCocktails);
        setLoading(false);
    };

    // Fonction pour récupérer les cocktails filtrés selon le critère sélectionné
    const fetchFilteredCocktails = async () => {
        setLoading(true);
        let url = '';

        if (filterType === 'letter') {
            url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filterValue}`;
        } else if (filterType === 'ingredient') {
            url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filterValue}`;
        } else if (filterType === 'glass') {
            url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${filterValue}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        if (data.drinks) {
            setCocktails(data.drinks);
        } else {
            setCocktails([]);
        }
        setLoading(false);
    };

    // Fetch tous les cocktails au chargement initial
    useEffect(() => {
        fetchAllCocktails();
    }, []);

    // Fetch les cocktails filtrés lorsqu'un filtre est sélectionné
    useEffect(() => {
        if (filterType !== 'all' && filterValue !== '') {
            fetchFilteredCocktails();
        }
    }, [filterType, filterValue]);

    if (loading) {
        return <div>Chargement des cocktails...</div>;
    }

    return (
        <div>
            <h1 style={{ marginBottom: '30px' }}>Liste des Cocktails</h1>

            {/* Menu de filtres */}
            <Form>
                <Form.Group controlId="filterType">
                    <Form.Label>Filtrer par :</Form.Label>
                    <Form.Control 
                        as="select" 
                        onChange={(e) => setFilterType(e.target.value)} 
                        defaultValue="all"
                    >
                        <option value="all">Tous les cocktails</option>
                        <option value="letter">Par lettre</option>
                        <option value="ingredient">Par ingrédient</option>
                        <option value="glass">Par verre</option>
                    </Form.Control>
                </Form.Group>

                {/* Champ de sélection du filtre */}
                {filterType !== 'all' && (
                    <Form.Group controlId="filterValue">
                        <Form.Label>Sélectionnez {filterType === 'letter' ? 'une lettre' : filterType === 'ingredient' ? 'un ingrédient' : 'un type de verre'}</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder={`Entrez ${filterType === 'letter' ? 'une lettre' : filterType === 'ingredient' ? 'un ingrédient' : 'un type de verre'}`}
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)} 
                        />
                    </Form.Group>
                )}

                <Button onClick={fetchFilteredCocktails} variant="primary" className="mb-4">
                    Appliquer le filtre
                </Button>
            </Form>

            {/* Affichage des cocktails */}
            <Row>
                {cocktails.map((cocktail) => (
                    <Col key={cocktail.idDrink} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Link className="link" to={`/cocktail/${cocktail.idDrink}`}>
                            <Card className="rounded-card" border="light">
                                <Image variant="top" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} roundedCircle />
                                <Card.Title>
                                    {cocktail.strDrink}
                                </Card.Title>
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

export default CocktailList;
