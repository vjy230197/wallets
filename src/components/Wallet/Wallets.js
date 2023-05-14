import React from 'react'
import Metamask from './Metamask';
import WalletConnect from './WalletConnect';

function Wallets() {
    return (
        <>
            <div className='flex py-20 px-20'>
                <WalletConnect />
                <Metamask />
            </div>

        </>
    )
}

export default Wallets;