import React, { useReducer } from 'react';

function ManualCounter() {

    const initialState = 0;

    const reducer = (state, action) => {
        if (action.type === 'Increment')
            state = state + 1

        if (action.type === 'Decrement')
            state = state - 1

        return state
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <>
            <div style={{ padding: '5rem', 'fontSize': '7rem', 'fontWeight': 'bold' }} className='text-center'>
                {state}
            </div>
            <div className='flex justify-center'>
                <button className='me-5' onClick={() => {
                    dispatch({ type: 'Increment' })
                }}>
                    Increase
                </button>
                <button onClick={() => {
                    dispatch({ type: 'Decrement' })
                }}>
                    Decrease
                </button>
            </div>
        </>
    )
}

export default ManualCounter