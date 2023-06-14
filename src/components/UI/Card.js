import React from 'react'
import classes from './Card.module.css'

function Card(props) {

    return (
        <div className={`${classes.card} ${props.className}`} style={{ 'maxWidth': props.maxWidth, 'margin': props.margin }}>{props.children}</div>
    )
}

export default Card