import React from 'react';
import Modal from './Modal'; 

const ConfirmDeleteModal = ({ show, handleClose, confirmDeleteHandler }) => {
  return (
    <Modal show={show} handleClose={handleClose} title="Confirm Delete">
      <p>Êtes-vous sûr de vouloir supprimer cet objectif?</p>
      <button onClick={confirmDeleteHandler}>Oui</button>
      <button onClick={handleClose}>Non</button>
    </Modal>
  );
};

export default ConfirmDeleteModal;
