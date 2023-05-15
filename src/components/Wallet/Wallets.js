import React from 'react'
import Metamask from './Metamask';
import WalletConnect from './WalletConnect';

function Wallets() {
    return (
        <>
            <div className='flex px-20 py-20 justify-center'>
                <WalletConnect />
                <Metamask />
            </div>

        </>
    )
}

export default Wallets;