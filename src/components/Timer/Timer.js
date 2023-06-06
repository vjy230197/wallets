import React, { useState } from 'react';
import DatePicker from "react-datepicker";

function Timer() {

    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [days, setDays] = useState(0)

    const [startDate, setStartDate] = useState(new Date());

    setInterval(() => {
        const currentTime = Date.now();
        const endTime = 1690427873000;

        let diff = endTime - currentTime;

        setSeconds(Math.floor((diff / 1000) % 60) > 0 ? Math.floor((diff / 1000) % 60) : 0);
        setMinutes(Math.floor((diff / 1000 / 60) % 60) > 0 ? Math.floor((diff / 1000 / 60) % 60) : 0);
        setHours(Math.floor((diff / (1000 * 60 * 60)) % 24) > 0 ? Math.floor((diff / (1000 * 60 * 60)) % 24) : 0);
        setDays(Math.floor(diff / (1000 * 60 * 60 * 24)) > 0 ? Math.floor(diff / (1000 * 60 * 60 * 24)) : 0);

    }, 1000)

    return (
        <div style={{ padding: '5rem', fontSize: '7rem', fontWeight: '700' }}>
            <span className='me-5'>
                {days} Days
            </span>
            <span className='me-5'>
                {hours} Hours
            </span>
            <span className='me-5'>
                {minutes} Minutes
            </span>
            <span>
                {seconds} Seconds
            </span>
        </div>
    )
}

export default Timer