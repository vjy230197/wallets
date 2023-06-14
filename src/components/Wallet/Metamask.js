import React, { useState } from 'react';
import Sign from './Sign';

function Metamask() {
    const [accounts, setAccount] = useState([]);
    const [signature, setSignature] = useState(null);

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
        setSignature(null)
    }

    window.ethereum.on('accountsChanged', accountChangedHandler);

    const handleSign = sign => {
        setSignature(sign)
    }

    const style = { 'margin': 'auto', 'max-width': '7rem', 'margin-bottom': '1rem' }

    return (
        <div>
            {accounts.length ? (
                <>
                    {!signature && <Sign onSign={handleSign} />}
                    {signature && <div>
                        <h5 className='mb-5'>{accounts.substring(0, 15) + '...'}</h5>
                        <button onClick={handleDisconnect}>Disconnect</button>
                    </div>}

                </>) :
                <div>
                    <img src='https://assets.seracle.com/metamask.png' style={style}></img>
                    <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={connectMetamask} >Metamask</button>

                </div>}
        </div>

    )
}

export default Metamask;