import React from 'react'
import Metamask from './Metamask';
import WalletConnect from './WalletConnect';
import Card from '../UI/Card';

function Wallets() {
    return (
        <>
            <Card>
                <div className='flex px-20 py-20 justify-center'>
                    <WalletConnect />
                    <Metamask />
                </div>
            </Card>
        </>
    )
}

export default Wallets;