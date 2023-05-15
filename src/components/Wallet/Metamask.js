import React, { useState } from 'react'
function Metamask() {
    const [accounts, setAccount] = useState([]);

    const connectMetamask = () => {
        if (window.ethereum) {

            window.ethereum.request({
                method: 'eth_requestAccounts'
            }).then((result) => {
                accountChangedHandler(result[0])
            }).catch((error) => {
                console.error(error);
            });
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

    window.ethereum.on('accountsChanged', accountChangedHandler);

    const style = { 'margin': 'auto', 'max-width': '7rem', 'margin-bottom': '1rem' }

    return (
        <div>
            {accounts.length ? (<>
                <p>{accounts}</p>
                <button onClick={handleDisconnect}>Disconnect</button>
            </>) :
                <div>
                    <img src='https://assets.seracle.com/metamask.png' style={style}></img>
                    <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={connectMetamask} >Metamask</button>

                </div>}
        </div>

    )
}

export default Metamask;