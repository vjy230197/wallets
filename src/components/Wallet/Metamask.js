import React, { useState } from 'react'

function Metamask() {
    const [accounts, setAccount] = useState([]);

    const connectMetamask = () => {
        if (window.ethereum) {
            window.ethereum.request({
                method: 'eth_requestAccounts'
            }).then((result) => {
                accountChangedHandler(result[0])
            })
        }
        else {
            console.log('no metamask installed.');
        }
    }

    const accountChangedHandler = (account) => {
        setAccount(account)
    }

    const handleDisconnect = () => {
        setAccount([])
    }

    // window.ethereum.on('accountsChanged', accountChangedHandler);

    return (
        <div>
            {accounts.length ? (<>
                <p>{accounts}</p>
                <button onClick={handleDisconnect}>Disconnect</button>
            </>) :
                <button onClick={connectMetamask} >Metamask</button>}
        </div>

    )
}

export default Metamask;