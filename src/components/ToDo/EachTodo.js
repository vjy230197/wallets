import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import Dropdown from 'react-bootstrap/Dropdown';

function EachTodo(props) {
    const { id, name } = props.todo

    return (

        <div className='card px-4 py-3 mb-3'>
            <div className="flex justify-between">
                <div>
                    <h4 className='mb-2'>{name} </h4>
                    <h5>{id} </h5>
                </div>
                <div className='flex items-center'>
                    {/* <button onClick={() => props.delete(id)}>Delete</button> */}
                    <select >
                        <option value="Orange">Orange</option>
                        <option value="Radish">Radish</option>
                        <option value="Cherry">Cherry</option>
                    </select>
                </div>
            </div>

        </div>
    )
}

export default EachTodo