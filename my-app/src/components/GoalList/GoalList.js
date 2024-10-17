import React from 'react';
import GoalItem from './GoalItem';

const GoalList = ({ goals, openEditModal, openDeleteModal }) => {
  return (
    <ul>
      {goals.map((goal, index) => (
        <GoalItem 
          key={index} 
          goal={goal} 
          openEditModal={openEditModal} 
          openDeleteModal={openDeleteModal} 
        />
      ))}
    </ul>
  );
};

export default GoalList;
