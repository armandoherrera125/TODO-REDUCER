import React, { useReducer } from 'react'
import './reducer.css';
export const UseReducerExample = () => {
    const initialState = {
        counter:0
    }
    const reducer = (state,action) => {
        switch (action.type) {
            case 'increment':
                return {
                    counter: state.counter + 1
                }
            case 'decrement':
                return {
                    counter: state.counter -1
                }
               
            default:
                throw new Error('Invalid action');
        }

    }
    const [state,dispatch] = useReducer(reducer,initialState);
    console.log(state);
    return (
    <>
    <h1>UseReducer</h1>
    <hr></hr>
    <button onClick={ () => dispatch({type: 'increment'}) }></button>

    </>

  )
}
