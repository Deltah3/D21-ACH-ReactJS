import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Form, Button, Image } from 'react-bootstrap';

const CocktailList = () => {
    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all'); 
    const [filterValue, setFilterValue] = useState('');  
    const [ingredients, setIngredients] = useState([]);
    const [categories, setCategories] = useState([]);
    const [glasses, setGlasses] = useState([]);

    const fetchAllCocktails = async () => {
        const allCocktails = [];
        const letters = 'abcdefghijklmnopqrstuvwxyz'; 
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

    const fetchIngredients = async () => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`);
        const data = await response.json();
        setIngredients(data.drinks);
    };

    const fetchCategories = async () => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
        const data = await response.json();
        setCategories(data.drinks);
    };

    const fetchGlasses = async () => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`);
        const data = await response.json();
        setGlasses(data.drinks);
    };

    const fetchFilteredCocktails = async () => {
        setLoading(true);
        let url = '';

        if (filterType === 'letter') {
            url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filterValue}`;
        } else if (filterType === 'ingredient') {
            url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filterValue}`;
        } else if (filterType === 'category') {
            url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filterValue}`;
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

    useEffect(() => {
        fetchAllCocktails();
        fetchIngredients();
        fetchCategories();
        fetchGlasses();
    }, []);

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
                        <option value="category">Par catégorie</option>
                        <option value="glass">Par verre</option>
                    </Form.Control>
                </Form.Group>

                {filterType !== 'all' && (
                    <Form.Group controlId="filterValue">
                        <Form.Label>Sélectionnez {filterType === 'letter' ? 'une lettre' : filterType === 'ingredient' ? 'un ingrédient' : filterType === 'category' ? 'une catégorie' : 'un type de verre'}</Form.Label>
                        {filterType === 'ingredient' && (
                            <Form.Control 
                                as="select" 
                                value={filterValue} 
                                onChange={(e) => setFilterValue(e.target.value)}
                            >
                                {ingredients.map((ingredient) => (
                                    <option key={ingredient.strIngredient} value={ingredient.strIngredient}>
                                        {ingredient.strIngredient}
                                    </option>
                                ))}
                            </Form.Control>
                        )}
                        {filterType === 'category' && (
                            <Form.Control 
                                as="select" 
                                value={filterValue} 
                                onChange={(e) => setFilterValue(e.target.value)}
                            >
                                {categories.map((category) => (
                                    <option key={category.strCategory} value={category.strCategory}>
                                        {category.strCategory}
                                    </option>
                                ))}
                            </Form.Control>
                        )}
                        {filterType === 'glass' && (
                            <Form.Control 
                                as="select" 
                                value={filterValue} 
                                onChange={(e) => setFilterValue(e.target.value)}
                            >
                                {glasses.map((glass) => (
                                    <option key={glass.strGlass} value={glass.strGlass}>
                                        {glass.strGlass}
                                    </option>
                                ))}
                            </Form.Control>
                        )}
                        {filterType === 'letter' && (
                            <Form.Control 
                                type="text" 
                                placeholder="Entrez une lettre"
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)} 
                            />
                        )}
                    </Form.Group>
                )}

                <Button onClick={fetchFilteredCocktails} variant="primary" className="mb-4">
                    Appliquer le filtre
                </Button>
            </Form>

            <Row>
                {cocktails.map((cocktail) => (
                    <Col key={cocktail.idDrink} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Link className="link" to={`/cocktail/${cocktail.idDrink}`}>
                            <Card className="rounded-card border-light h-100">
                                <Image variant="top" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} roundedCircle />
                                <Card.Title className="text-center">
                                    {cocktail.strDrink}
                                </Card.Title>
                                <Card.Body className='text-center'>
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
