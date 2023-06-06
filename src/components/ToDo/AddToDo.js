import React, { useState } from 'react'

function AddToDo(props) {
    const [toDo, setToDo] = useState('')

    const addTodoHandler = (event) => {
        const value = event.target.value;

        setToDo(value)
    }

    const submitForm = (event) => {
        event.preventDefault()

        if (toDo === '')
            return alert('Task empty')

        props.addTodoHandler(toDo)
        setToDo('')
    }

    return (
        <div>
            <form action="" onSubmit={submitForm}>
                <div className="flex">
                    <input value={toDo} type="text" className='me-3 ps-3' onChange={addTodoHandler} />
                    <button>
                        Add ToDo
                    </button>
                </div>

            </form>
        </div>
    )
}

export default AddToDo