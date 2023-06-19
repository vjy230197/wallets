import React, { useState } from 'react'
import Select from 'react-select'

const Dropdown = (props) => {
    const [value, setValue] = useState();
    const array = props.array;

    const handleChange = (event) => {
        setValue(event.key);

        props.onDropdownChange(event.key)
    };

    const colourStyles = {
        control: (styles, { isSelected, isFocused }) => ({
            ...styles, border: '1px solid rgb(229, 232, 235)',
            padding: '5px',
            borderRadius: '12px',
            textAlign: 'left',
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                textAlign: 'left',
                cursor: 'pointer',
                background: isFocused ? '#F5F5F5' : 'white',
                color: 'black',
                padding: '12px 20px',
                backgroundColor: isSelected ? '#F5F5F5' : 'white',
            }
        }
    };

    return (
        <Select styles={colourStyles} options={array} onChange={handleChange} />
    )
}

export default Dropdown