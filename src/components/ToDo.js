import React, { useEffect, useReducer, useState } from 'react';
import { reducer } from './todoReducer';
import './reducer.css';
export const ToDo = () => {

    const init = () => {
        return JSON.parse(localStorage.getItem("state")) || [];
    }

    const [state, dispatch] = useReducer(reducer, [], init);

    useEffect(() => {
        localStorage.setItem("state", JSON.stringify(state));
    }, [state])

    const [inputTask, setinputTask] = useState({
        desc: ""
    });
    const { desc } = inputTask;
    const handleInputChange = ({ target }) => {
        console.log(target.value);
        setinputTask({
            ...inputTask,
            [target.name]: target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (desc.trim().length <= 1) {
            return;
        } else {


            const newTask = {
                id: new Date().getTime(),
                description: desc,
                done: false
            }
            const action = {
                type: "add",
                payload: newTask,
            }
            dispatch(action);
        }
    }
    const handleDelete = (taskId) => {
        console.log(taskId);
        const action = {
            type: "delete",
            payload: taskId
        }
        dispatch(action);
    }
    const handleDoneTask = (taskId) => {
        console.log(taskId);
        const action = {
            type: "done",
            payload: taskId
        }
        dispatch(action);
    }
    return (
        <>
            <h1>ToDo ({state.length})</h1>
            <hr></hr>
            <h1 className="title">ToDo List</h1>
            <div className="container d-flex justify-content-center">
                <div className="row">
                    <div className="col-7">

                        <div className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <ol className='list-group list-group-flush list-group-numbered'>
                                    {
                                        state.map(valor => {
                                            return <li className="list-group-item list-group-item-primary" key={valor.id}>
                                                <p className={valor.done && 'complete'} onClick={() => handleDoneTask(valor.id)}>
                                                    {valor.description}
                                                </p>
                                                <button onClick={() => {
                                                    handleDelete(valor.id);
                                                }} className="btn btn-outline-danger">Eliminar</button>
                                            </li>
                                        })
                                    }
                                </ol>

                                {/* <button className="add" onClick={() => dispatch({ type: "add" })}>+ New Task</button> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <form onSubmit={handleSubmit}>
                            <input className=' form-control form-control-lg'
                                onChange={handleInputChange}
                                name="desc"
                                value={desc}
                                id="desc1"
                            />
                            <button type="submit" className="btn btn-outline-success mt-3 btn-block">+ New Task</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
