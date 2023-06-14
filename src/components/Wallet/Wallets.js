import React from 'react'
import Metamask from './Metamask';
import WalletConnect from './WalletConnect';
import Card from '../UI/Card';

function Wallets() {
    return (
        <>
            <Card maxWidth='30rem' margin='auto'>
                <div className='flex px-20 py-20 justify-center' style={{ marginTop: '5rem' }}>
                    <WalletConnect />
                    <Metamask />
                </div>
            </Card>
        </>
    )
}

export default Wallets;