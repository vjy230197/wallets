import React, { useState } from 'react'

function DropdownSelect() {


    const countries = [{
        country: 'India',
        value: 'IN',
        cities: ['Delhi', 'Mumbai']
    }, {
        country: 'Pak',
        value: 'PK',
        cities: ['Lahore', 'Karachi']
    }]

    const [selectedCountry, setSelectedCountry] = useState('')

    const handleCountrySelection = (e) => {
        setSelectedCountry(parseInt(e.target.value))
    }

    return (
        <div style={{ padding: '5rem' }}>
            <div className='mb-5'>
                <select onChange={handleCountrySelection}>
                    {
                        countries.map((item, index) => {
                            return <option key={item.value} value={index}>{item.country}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <select>
                    {
                        countries[parseInt(selectedCountry)].cities.map((item) => {
                            return <option key={item} value={item}>{item}</option>
                        })
                    }
                </select>
            </div>
        </div>
    )
}

export default DropdownSelect