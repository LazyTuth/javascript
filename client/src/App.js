import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from './Persons/Persons';

class App extends Component {
  state = {
    persons: [
      {id: 1, name: "Test1", age: 20},
      {id: 2, name: "Test2", age: 30, child: "Test Child"},
      {id: 3, name: "Test3", age: 40}
    ],
    showPersons: false
  };

  toggleButtonhandler = () => {
    const showPersons = this.state.showPersons;
    this.setState({showPersons: !showPersons})
  }

  changedName = (id, newName) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });

    const person = {...this.state.persons[personIndex]};
    person.name = newName;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }
  render() {
    let persons = null;
    if (this.state.showPersons) {
      persons = (<Persons persons={this.state.persons} changedName={this.changedName}/>);
    }
    return (
      <div className={classes.App}>
        <h1>This is react</h1>
        <button className={classes.Button_Test} onClick={this.toggleButtonhandler}>Toggle List</button>
        {persons}
      </div>
    );
  };
}

export default App;
