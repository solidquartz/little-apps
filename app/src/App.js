/* eslint-disable default-case */
import React, { useReducer, useState } from "react";
import Todo from './Todo.js';


export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo'
};

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    //payload is from the handleSubmit via the input element
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      })
    case ACTIONS.DELETE_TODO:
      //if the todo id does not match the payload, keep it, otherwise, delete it
      return todos.filter(todo => todo.id !== action.payload.id)
    default:
      return todos;
  }
};

const newTodo = (name) => {
  return { id: Date.now(), name: name, complete: false };
};


export default function App() {
  //using an array because only one thing will be in state
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch: what we do, payload: the parameters for the dispatch action
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    //payload is an object which contains all the variable values we need to perform the action
    setName('');
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </form>
      
        {todos.map(todo => {
          return <Todo
            key={todo.id}
            todo={todo}
            dispatch={dispatch}
          //passes todo and dispatch function to the component
          />;
        })}

    </>
  );
}
