/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import './tarefas.css';

import { FaEdit, FaWindowClose } from 'react-icons/fa';

export default function Tarefas({ tarefas, handleDelete, handleEdit }) {
  return (
    <ul className="tarefas">
      {tarefas.map((tarefa, index) => (
        <li key={tarefa}>
          {tarefa}
          <span>
            <FaEdit onClick={(e) => handleEdit(e, index)} className="edit" />
            <FaWindowClose onClick={(e) => handleDelete(e, index)} className="delete" />
          </span>
        </li>
      ))}
    </ul>
  );
}

Tarefas.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  tarefas: PropTypes.array.isRequired,
};
