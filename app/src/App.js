import React, { useReducer } from "react";

//useReducer is normally use for state MUCH more complex than this, but here is a quick reference

//rather than hard coding the dispatch types as strings, we can declare a global variable containing all of them to make it safer & easier to manage. gives us autocomplete too :)
const ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement'
}


function App() {

  //whatever we call the dispatch function with is passed into the action parameter. reducer will return the new updated state
  const reducer = (state, action) => {
    //switch checks all of the dispatch types
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 }
      case 'decrement':
        return { count: state.count - 1 }
      //good idea to catch with a default, potentially throw an error or just return the current state to prevent some bugs
      default:
        return state;
    }
  };

  //function as first arg, object as second with all states inside
  //dispatch function is called to update our state using the reducer function
  const [state, dispatch] = useReducer(reducer, { count: 0 });

//whenever we want to use anything in useReducer, we call dispatch with the relevant type to trigger the correct part of the reducer function
  const decrementCount = () => {
    dispatch({ type: ACTIONS.DECREMENT });
  };

  const incrementCount = () => {
    //dispatch is passed a TYPE used in the reducer switch statement
    dispatch({ type: ACTIONS.DECREMENT });
  };

  return (

    <>
      <button onClick={decrementCount}>-</button>
      <span>{state.count}</span>
      <button onClick={incrementCount}>+</button>
    </>

  );
}

export default App;
