import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function NavBar() {
    const navigate = useNavigate()
    const style = { 'backdropFilter': 'blur(10px)', 'top': '1rem', 'margin': 'auto', 'maxWidth': '85%', 'position': 'sticky', 'zIndex': '19' }

    return (
        <div className='bg-white text-black px-10 py-3 border border-white-500 rounded-lg relative' style={style}>
            <div className='flex justify-between'>
                <h4 style={{ 'cursor': 'pointer' }} onClick={() => navigate('/')}>Home</h4>
                <h4 style={{ 'cursor': 'pointer' }} onClick={() => navigate('/mint')}>Mint</h4>
                <h4 style={{ 'cursor': 'pointer' }} onClick={() => navigate('/created')}>Created</h4>
                <h4 style={{ 'cursor': 'pointer' }} onClick={() => navigate('/collected')}>Collected</h4>
                <Button onClick={() => navigate('/wallets')}>Wallets</Button>
            </div>
        </div>
    )
}

export default NavBar