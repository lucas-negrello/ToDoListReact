/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';

// Form
import Form from './Form';

// Tarefas
import Tarefas from './Tarefas';

import './Main.css';

export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: [

    ],
    index: -1,
  };

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if (!tarefas) return;

    this.setState({ tarefas });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  handleEdit = (e, index) => {
    const { tarefas } = this.state;

    this.setState({
      index,
      novaTarefa: tarefas[index],
    });
  };

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    this.setState({
      tarefas: [...novasTarefas],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim(); // o trim elimina os espaços no final

    if (tarefas.indexOf(novaTarefa) !== -1) return; // checa se a nova tarefa já existe nas tarefas
    const novasTarefas = [...tarefas];

    if (index === -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: '',
      });
    } else {
      novasTarefas[index] = novaTarefa;
      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  render() {
    const { novaTarefa, tarefas } = this.state;
    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />
        <Tarefas
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          tarefas={tarefas}
        />
      </div>
    );
  }
}
