import React, { useState } from 'react'
import AddToDo from './AddToDo';
import TodoList from './TodoList';
import array from '../../constants/toDoArray'
import { uuid } from 'uuidv4'

function Todo() {
    const [todoArray, setTodoArray] = useState(array)

    const addTodoHandler = (item) => {
        const obj = {
            name: item,
            id: uuid()
        }
        setTodoArray([obj, ...todoArray])
    }

    const deleteTodoHandler = id => {
        const newArray = todoArray.filter(item => {
            return item.id !== id
        })
        setTodoArray(newArray)
    }

    return (
        <div style={{ 'padding': '5rem 10rem' }}>
            <div className="mb-5 text-left">
                <h3>Add Todo</h3>
                <AddToDo addTodoHandler={addTodoHandler} />
            </div>
            <div className='text-left'>
                <h3>ToDo List</h3>
                <TodoList array={todoArray} getToDoId={deleteTodoHandler} />
            </div>
        </div>
    )
}

export default Todo