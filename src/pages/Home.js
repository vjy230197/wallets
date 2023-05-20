import React from 'react'
import { Form, Button } from "react-bootstrap";
import { useId } from 'react';


function Home() {
    const style = { 'margin': 'auto', 'padding': '5rem' }
    const passwordHintId = useId();
    return (
        <div style={style}>
            Home
        </div>
    )
}

export default Home