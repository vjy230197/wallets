import React, { useState } from 'react'
import classes from './Mint.module.css'
import { Button } from 'react-bootstrap';
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';
import Loader from '../UI/Loader'
const mintAbiArray = require('../../abis/mintAbiArray')

const Mint = () => {
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState()
    const [imageUrl, setImageUrl] = useState();
    const [metadataUri, setMetadataUri] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [mintHash, setMintHash] = useState()

    const [accounts, setAccount] = useState([]);
    const [balance, setBalance] = useState();

    const [loader, setLoader] = useState(false)
    const [hideSubmit, setHideSubmit] = useState(true)

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const CONTRACT_ADDRESS = '0x56716b82f27a6c71CCb7Cc7cDFC1549f408407a8'

    const sumbit = async event => {
        setLoader(true)
        const body = {
            name: name,
            image: imageUrl,
            price: price,
            description: description
        }

        const response = await fetch("http://localhost:1234/uploadFileIpfs", {
            body: JSON.stringify(body),
            method: 'POST',
            headers: { "Content-Type": "application/json", 'platform': 'web' }
        });

        if (response.status === 200) {

            const data = await response.json()
            const metadata_uri = data.data.metadata_uri;

            setMetadataUri(metadata_uri)

        } else {
            console.error('Something went wrong');
        }

        try {
            const signer = provider.getSigner();

            const contract = new ethers.Contract(CONTRACT_ADDRESS, mintAbiArray, signer);

            const result = await contract.connect(signer).mintNft(accounts, metadataUri)

            setLoader(false)

            const tx = await provider.getTransactionReceipt(result.hash);

            console.log('tx', tx);
            setMintHash(result.hash)
        }

        catch (e) {
            setLoader(false)
            console.error(e);
        }

    }

    const addNft = async () => {
        const body = {
            name: name,
            image: imageUrl,
            price: price,
            description: description,
            currency: 'matic',
            address: accounts,
            mint_hash: mintHash,
            contract_address: CONTRACT_ADDRESS,
            metadata_uri: metadataUri
        }

        const response = await fetch("http://localhost:1234/addNft", {
            body: JSON.stringify(body),
            method: 'POST',
            headers: { "Content-Type": "application/json", 'platform': 'web' }
        });

        if (response.status === 200)
            navigate("/")
    }

    const nameChangeHandler = event => {
        setName(event.target.value)
    }

    const priceChangeHandler = event => {
        setPrice(event.target.value)
    }

    const descriptionChangeHandler = event => {
        setDescription(event.target.value)
    }


    const fileUpload = async event => {
        console.log('event', event);
        const file = event.target.files[0]

        setPreviewImage(URL.createObjectURL(file))


        const formdata = new FormData();

        formdata.append('file', file);

        const res = await fetch('http://localhost:1234/uploadNftImage', {
            method: 'POST',
            body: formdata,
            headers: {
                'platform': 'web'
            }
        })

        if (res.status === 200) {
            const image = await res.json()
            setImageUrl(image.url)
            setHideSubmit(false)

        } else {
            console.error('Something went wrong');
        }
    }

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

    const accountChangedHandler = async (account) => {
        setAccount(account)

        const balance = await provider.getBalance(account);
        const nativeBalance = ethers.utils.formatEther(balance);

        await setBalance(nativeBalance)
    }

    return (
        <>
            <div className='container' style={{ 'padding': '5rem' }}>

                <div className={classes.card}>
                    {(!mintHash && loader) && <div style={{ 'padding': '20rem 0rem' }}><Loader ></Loader></div>}
                    {(!mintHash && !loader) && <div>
                        <div className='flex justify-end'>
                            {accounts.length === 0 && (<h5 style={{ 'cursor': 'pointer' }} onClick={connectMetamask}>Connect</h5>)}
                            {accounts.length > 0 && (
                                <div>
                                    <h5 style={{ 'cursor': 'pointer' }}>{accounts.substring(0, 7) + '...'}</h5>
                                    <div className='flex justify-center align-middle mt-1' style={{ fontSize: '10px' }}>
                                        <span className='me-2'>{balance}</span>
                                        <span><img style={{ maxWidth: '12px' }} src="https://assets.seracle.com/polygon-matic.svg" alt="" /></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='mb-3'>
                            <label className='flex py-2'>NFT Name</label>
                            <input value={name} type="text" className='me-3 ps-3' onChange={nameChangeHandler} />
                        </div>

                        <div className='mb-3'>
                            <label className='flex py-2'>Price</label>
                            <div style={{ 'position': 'relative' }}>
                                <input value={price} type="number" className='me-3 ps-3' onChange={priceChangeHandler} />
                                <span style={{ 'position': 'absolute', 'top': '12px', 'right': '1rem' }}>
                                    <img src="https://assets.seracle.com/polygon-matic.svg" alt="" />
                                </span>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <label className='flex py-2'>Description</label>
                            <textarea value={description} cols="5" rows='5' className='me-3 ps-3' onChange={descriptionChangeHandler} />
                        </div>

                        <div className='mb-5'>
                            <label className='flex py-2'>NFT Image</label>
                            <input type="file" className='me-3 ps-3' onChange={fileUpload} />

                            <img className='mt-3 rounded-lg' src={previewImage} />
                        </div>

                        <div className="text-center">
                            <Button disabled={hideSubmit} onClick={sumbit}>MINT</Button>
                        </div>
                    </div>}

                    {mintHash && <div>
                        <div className='flex justify-center mb-5'>
                            <img style={{ 'maxWidth': '11rem' }} src="https://assets.seracle.com/onlinegiftools.gif" alt="" />
                        </div>
                        <div className='mb-5'>
                            <h3>NFT Minted</h3>
                        </div>
                        <div className='flex justify-between mb-2'>
                            <div>Transaction Hash</div>
                            <span>
                                <a target="_blank" href={`https://mumbai.polygonscan.com/tx/${mintHash}`}>{mintHash.substring(0, 15) + '...'}</a>
                            </span>
                        </div>
                        <div className='flex justify-between mb-5'>
                            <div>Contract Address</div>
                            <span>
                                <a target="_blank" href={`https://mumbai.polygonscan.com/address/${CONTRACT_ADDRESS}`}>{CONTRACT_ADDRESS.substring(0, 15) + '...'}</a>
                            </span>
                        </div>
                        <div>
                            <Button onClick={addNft}>Add NFT</Button>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Mint