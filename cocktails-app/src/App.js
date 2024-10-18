import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Form, Button } from 'react-bootstrap';

import CocktailList from './components/CocktailList';
import CocktailDetail from './components/CocktailDetail';
import CocktailsByIngredient from './components/CocktailByIngredient';
import Favorites from './components/Favorites';

function App() {
  return (
    <Router>  
      <header>
        <Container>
            <Nav className="me-auto">
                <Nav.Link><Link to="/">Cocktails</Link></Nav.Link>
                <Nav.Link><Link to="/favorites">Favoris</Link></Nav.Link>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
            </Nav>
      </Container>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<CocktailList />} />
          <Route path="/cocktail/:id" element={<CocktailDetail />} />
          <Route path="/ingredients/:ingredient" element={<CocktailsByIngredient />} /> 
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;