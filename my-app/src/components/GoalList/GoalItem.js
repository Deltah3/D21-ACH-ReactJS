import React from 'react';

const GoalItem = ({ goal, openEditModal, openDeleteModal }) => {
  return (
    <li>
      {goal}
      <button class="edit-btn" onClick={() => openEditModal(goal)}>Modifier</button>
      <button class="remove-btn" onClick={() => openDeleteModal(goal)}>×</button>
    </li>
  );
};

export default GoalItem;
