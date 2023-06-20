import React, { useState } from 'react'
import Select, { components } from 'react-select'
const { Option } = components;

const Dropdown = (props) => {
    const [value, setValue] = useState();
    const array = props.array;

    const handleChange = (event) => {
        setValue(event.key);

        props.onDropdownChange(event.key)
    };

    function IconOption(props) {
        const {
            data: { label, Icon },
        } = props;

        return (
            <Option {...props}>
                <div className="flex items-center gap-2">
                    {Icon && <Icon />}
                    <span>{label}</span>
                </div>
            </Option>
        );
    }

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
        <Select styles={colourStyles} options={array} getOptionLabel={e => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {<img src={e.icon} style={{ 'maxWidth': '2rem', 'borderRadius': '100%', 'height': '2rem' }} alt="" />}
                <span className='ms-3'>{e.label}</span>
            </div>
        )} onChange={handleChange} />
    )
}

export default Dropdown