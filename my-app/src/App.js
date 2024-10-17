import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GoalList from './components/GoalList';
import ConfirmDeleteModal from './components/Modal/ConfirmDeleteModal';
import EditModal from './components/Modal/EditModal';

// ---------------------------------------

function App() {
  const [goals, setGoals] = useState([
    "Faire les courses",
    "Aller à la salle de sport 3 fois par semaine",
    "Monter à plus de 5000m d'altitude",
    "Acheter mon premier appartement",
    "Perdre 5 kgs",
    "Gagner en productivité",
    "Apprendre un nouveau langage",
    "Faire une mission en freelance",
    "Organiser un meetup autour de la tech",
    "Faire un triathlon",
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [inputGoal, setInputGoal] = useState('');
 
  const [goalToEdit, setGoalToEdit] = useState(null); 
  const [goalToDelete, setGoalToDelete] = useState(null); 
  const [showModalEdit, setShowModalEdit] = useState(false); 
  const [showModalDelete, setShowModalDelete] = useState(false);

  const addGoalHandler = () => {
    if (inputGoal.trim() !== '') {
      setGoals([...goals, inputGoal]);
      setInputGoal('');
    }
  };

  const saveGoalHandler = () => {
    setGoals(goals.map((goal) => (goal === goalToEdit ? inputGoal : goal)));
    setInputGoal(''); 
    setIsEditing(false); 
    setGoalToEdit(null); 
  };

  const openEditModalHandler = (goal) => {
    setInputGoal(goal);
    setGoalToEdit(goal);
    setShowModalEdit(true);
  };

  const openDeleteModalHandler = (goal) => {
    setGoalToDelete(goal);
    setShowModalDelete(true); 
  };

  const confirmDeleteHandler = () => {
    setGoals(goals.filter((goal) => goal !== goalToDelete));
    setShowModalDelete(false); 
    setGoalToDelete(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (isEditing) {
        saveGoalHandler();
      } else {
        addGoalHandler();
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>

      {/* -------------------------------------------------------- */}

      <main>
        <h1>Objectifs</h1>
        <ConfirmDeleteModal
          show={showModalDelete}
          handleClose={() => setShowModalDelete(false)}
          confirmDeleteHandler={confirmDeleteHandler}
        />
        <EditModal
          show={showModalEdit}
          handleClose={() => setShowModalEdit(false)}
          inputGoal={inputGoal}
          setInputGoal={setInputGoal}
          saveGoalHandler={saveGoalHandler}
        />
        <div class="add-container">
          <input
            placeholder="Nouvel Objectif"
            type="text"
            value={inputGoal}
            onChange={(e) => setInputGoal(e.target.value)}
            onKeyDown={handleKeyDown}
         />
          <button class="add-btn" onClick={addGoalHandler}>Add</button>
        </div>
        <GoalList goals={goals} openEditModal={openEditModalHandler} openDeleteModal={openDeleteModalHandler} />
      </main>
    </div>
  );
}

export default App;
