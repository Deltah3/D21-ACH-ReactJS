import React, { useState } from 'react';
import Modal from './Modal'; 



const EditModal = ({ show, handleClose, inputGoal, setInputGoal, saveGoalHandler }) => {
    
    return (
        <Modal show={show} handleClose={handleClose} title="Edit Goal">
            <input
            type="text"
            value={inputGoal}
            onChange={(e) => setInputGoal(e.target.value)}
            />
            <button className="save-btn" onClick={saveGoalHandler}>Save</button>
        </Modal>
    );
  };
  
  export default EditModal;

