import React from 'react'

const Input = props => {
    return (
        <input 
            className={props.class}
            type={props.type} 
            value={props.input} 
            onChange={props.changed}
        ></input>
    )
}

export default Input