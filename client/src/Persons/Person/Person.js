import React from "react";
import withClass from "../../hoc/WithClass";
import classes from "./Person.module.css";

const Person = (props) => {
  let childContent = null;
  if (props.children) {
    childContent = <p>{props.children}</p>;
  }
  return (
    <div>
      <p>
        My name is {props.name}, I'm {props.age} years old.
      </p>
      {childContent}
      <input
        placeholder="Input new Name in here"
        onChange={props.changed}
        value={props.name}
      />
    </div>
  );
};

export default withClass(Person, classes.Person);
