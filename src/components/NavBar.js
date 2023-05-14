import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate()
    const style = { 'backdrop-filter': 'blur(10px)', 'top': '1rem', 'margin': 'auto', 'max-width': '85%' }

    return (
        <div className='bg-white text-black px-10 py-5 border border-white-500 rounded-lg relative' style={style}>
            <div className='flex justify-between'>
                <h1 onClick={() => navigate('/')}>Home</h1>
                <h1>Navbar</h1>
                <button onClick={() => navigate('/wallets')}>Connect</button>
            </div>
        </div>
    )
}

export default NavBar