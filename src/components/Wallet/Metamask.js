import React, { useState } from 'react';
import Sign from './Sign';
import { Button } from 'react-bootstrap';

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

    const style = { 'margin': 'auto', 'maxWidth': '7rem', 'marginBottom': '1rem' }

    return (
        <div>
            {accounts.length ? (
                <>
                    {!signature && <Sign onSign={handleSign} />}
                    {signature && <div>
                        <h5 className='mb-5'>{accounts.substring(0, 15) + '...'}</h5>
                        <Button onClick={handleDisconnect}>Disconnect</Button>
                    </div>}

                </>) :
                <div>
                    <img src='https://assets.seracle.com/metamask.png' style={style}></img>
                    <Button onClick={connectMetamask} >Metamask</Button>

                </div>}
        </div>

    )
}

export default Metamask;