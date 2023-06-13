import React, { useState } from 'react'
import Modal from '../UI/Modal'
import classes from './Sign.module.css'
import { Button } from 'react-bootstrap';
import { ethers } from "ethers";

function Sign(props) {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const sign = async () => {

        if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            try {
                const message = 'this is text';
                const signer = await provider.getSigner();
                const signature = await signer.signMessage(message);

                props.onSign(signature)
            }

            catch (e) {
                console.error(e);
            }
        }

    }

    return (
        <Modal>
            <div className={classes.container}>
                <div className='flex justify-center mb-5'>
                    <img className={classes.logo} src="https://assets.thetrustpay.com/logo.png" alt="" />
                </div>
                <div className='text-center mb-5'>
                    <h2>Welcome to Hefty.ART</h2>
                </div>
                <div className='text-center mb-5'>
                    <p>
                        By connecting your wallet and using Hefty.ART, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
                <div className='text-center'>
                    <Button onClick={sign}>Accept and Sign</Button>
                </div>
            </div>
        </Modal>
    )
}

export default Sign