import React from 'react'
import EachTodo from './EachTodo';

function TodoList(props) {

    const deleteTodoHandler = (id) => {
        props.getToDoId(id)
    }

    const array = props.array;
    const list = array.map(item => {
        return <EachTodo todo={item} key={item.id} delete={deleteTodoHandler} />
    })

    return (

        <div>{list}</div>
    )
}

export default TodoList