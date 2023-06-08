import React, { useState } from 'react';
import { ethers } from 'ethers';


function Metamask() {
    const [accounts, setAccount] = useState([]);
    const [provider, setProvider] = useState("");
    const [signature, setSignature] = useState();

    const connectMetamask = () => {
        if (window.ethereum) {

            window.ethereum.request({
                method: 'eth_requestAccounts'
            }).then((result) => {
                accountChangedHandler(result[0])

                const provider = new ethers.BrowserProvider(window.ethereum);

                setProvider(provider)

                if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
                    signMessage()
                }

            }).catch((error) => {
                console.error(error);
            });
        }
        else {
            console.log('no metamask installed.');
        }
    }

    const signMessage = async () => {
        try {
            const message = 'this is text';
            const signer = await provider.getSigner();
            const signature = await signer.signMessage(message);

            setSignature(signature)
        }

        catch (e) {
            console.error(e);
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
            {accounts.length && signature ? (<>
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