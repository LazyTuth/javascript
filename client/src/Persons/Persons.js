import React from "react";
import Person from "./Person/Person";

const Persons = (props) => {
  const changed = (id, event) => {
    props.changedName(id, event.target.value);
  };

  return (
    <div>
      {props.persons.map((person) => {
        if (person.child) {
          return (
            <Person
              key={person.id}
              id={person.id}
              name={person.name}
              age={person.age}
              changed={changed.bind(this, person.id)}
            >
              {person.child}
            </Person>
          );
        } else {
          return (
            <Person
              key={person.id}
              id={person.id}
              name={person.name}
              age={person.age}
              changed={changed.bind(this, person.id)}
            />
          );
        }
      })}
    </div>
  );
};

export default Persons;
