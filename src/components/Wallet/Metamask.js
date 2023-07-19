import React, { useEffect, useState } from 'react';
import Sign from './Sign';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { connectMetamask } from '../../Features/Slices/Metamask/metamaskSlice';

function Metamask() {
    const address = localStorage.getItem('address')
    const signature = localStorage.getItem('signature')
    const [message, setMessage] = useState()
    const [nonce, setNonce] = useState()

    const dispatch = useDispatch()

    const user = useSelector((state) => state.metamaskConnect.token)

    useEffect(() => {
        const data = {
            nonce: nonce,
            signature_message: message,
            signature: signature,
            address: address
        }

        if (nonce && message)
            dispatch(connectMetamask(data))
    }, [nonce, message])

    const connectMetamaskButton = () => {
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
        localStorage.setItem('address', account)
        window.location.reload()
    }

    const handleDisconnect = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('address')
        localStorage.removeItem('signature')
    }

    window.ethereum.on('accountsChanged', accountChangedHandler);

    const handleSign = async (body) => {
        localStorage.setItem('signature', body.signature)

        setMessage(body.message)
        setNonce(body.uuid)
    }

    const style = { 'margin': 'auto', 'maxWidth': '7rem', 'marginBottom': '1rem' }

    return (
        <div>
            {
                user && <div>
                    <h5 className='mb-5'>{address.substring(0, 6) + '...' + address.substring(address.length - 4, address.length)}</h5>
                    <Button onClick={handleDisconnect}>Disconnect</Button>
                </div>
            }
            {
                !signature && address && <Sign onSign={handleSign} />
            }
            {
                !signature && !address && !user && <div>
                    <img src='https://assets.seracle.com/metamask.png' style={style}></img>
                    <Button onClick={connectMetamaskButton} >Metamask</Button>
                </div>
            }
        </div>

    )
}

export default Metamask;