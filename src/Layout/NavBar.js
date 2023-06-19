import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function NavBar() {
    const navigate = useNavigate()
    const style = { 'backdropFilter': 'blur(10px)', 'top': '1rem', 'margin': 'auto', 'maxWidth': '85%', 'position': 'sticky', 'zIndex': '19' }

    return (
        <div className='bg-white text-black px-10 py-3 border border-white-500 rounded-lg relative' style={style}>
            <div className='flex justify-between align-items-center'>
                <span style={{ 'cursor': 'pointer' }} onClick={() => navigate('/')}>Home</span>
                <span style={{ 'cursor': 'pointer' }} onClick={() => navigate('/mint')}>Mint</span>
                <span style={{ 'cursor': 'pointer' }} onClick={() => navigate('/created')}>Created</span>
                {/* <span style={{ 'cursor': 'pointer' }} onClick={() => navigate('/collected')}>Collected</span> */}
                <span style={{ 'cursor': 'pointer' }} onClick={() => navigate('/contractForm')}>ContractForm</span>
                <span style={{ 'cursor': 'pointer' }} onClick={() => navigate('/dashboard')}>Dashboard</span>
                <Button onClick={() => navigate('/wallets')}>Wallets</Button>
            </div>
        </div>
    )
}

export default NavBar