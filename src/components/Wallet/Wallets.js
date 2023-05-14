import React from 'react'
import Metamask from './Metamask';
import WalletConnect from './WalletConnect';
import classes from './Wallets.module.css';

function Wallets() {
    return (
        <>
            <div className={classes.wallets}>
                <WalletConnect />
                <Metamask />
            </div>

        </>
    )
}

export default Wallets;