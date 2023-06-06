import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';

function Counter() {


    const [counter, setCounter] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setCounter((counter) => counter + 1)
        }, 1000)
        console.log('id', id);

        return () => {
            // console.log('id', id);
            clearInterval(id)
        }
    }, [])

    const start = () => {

    }

    const stop = () => {
        clearInterval(setCounter(counter))

    }

    // setInterval(() => {

    //     setCounter(counter + 1)
    // }, 2000)

    // setInterval(() => {
    //     setCounter(counter + 1)
    // }, 1000)


    return (
        <>
            <div style={{ padding: '5rem', fontSize: '7rem', fontWeight: '700' }}>
                {counter}
            </div>
            <div className='flex justify-between' style={{ margin: 'auto', width: '25rem' }}>
                <Button onClick={stop}>Stop</Button>
                <Button onClick={start}>Play</Button>
                <Button onClick={() => {
                    setCounter(0)
                }}>Restart</Button>
            </div>
        </>

    )
}

export default Counter