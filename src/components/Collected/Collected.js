import React, { useState, useEffect } from 'react'
import classes from './Collected.module.css'
import { ethers } from "ethers";
import Card from '../UI/Card';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../UI/Loader'

const Collected = () => {
    const navigate = useNavigate();

    const [accounts, setAccount] = useState([]);
    const [balance, setBalance] = useState();
    const [nfts, setNfts] = useState([])
    const [loader, setLoader] = useState(false)

    const provider = new ethers.providers.Web3Provider(window.ethereum);

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

    const collectedNfts = async () => {
        setLoader(true)
        const body = {
            address: accounts
        }
        const response = await fetch("http://localhost:1234/collectedNfts", {
            body: JSON.stringify(body),
            method: 'POST',
            headers: { "Content-Type": "application/json", 'platform': 'web' }
        });

        if (response.status === 200) {
            const json = await response.json()
            await setNfts(json.data)
            setLoader(false)
        } else {
            console.error('Something went wrong');
            setLoader(false)
        }
    }

    useEffect(() => {
        if (accounts.length > 0)
            collectedNfts()
    }, [accounts])


    const result = nfts.map((nft, index) => {
        return <Card key={index} maxWidth='20rem'>
            <div className='px-3 py-3' style={{ cursor: 'pointer' }} onClick={() => { navigate(`/nftdetails/${nft.nft_id}`) }}>
                <div className={classes.zoom_effect}>
                    <img src={nft.image} alt="" />
                </div>
                <div className='py-3 text-left px-3'>
                    <h5>{nft.name}</h5>
                </div>
                <hr />
                <div className='flex justify-between px-3 py-3'>
                    <div style={{ 'margin': 'auto 0', 'fontSize': '13px' }}>
                        Price <span className='ms-1'>
                            {nft.current_price} MATIC
                        </span>
                    </div>
                    <div>
                        <Button>View</Button>
                    </div>
                </div>
            </div>
        </Card>
    })


    return (
        <>
            <div className={classes.buyer}>
                <div className='flex justify-end mb-5'>
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
                <div>
                    {
                        !loader && accounts.length > 0 && nfts.length === 0 &&
                        <Card maxWidth='25rem' margin='auto'>
                            <div style={{ padding: '7rem' }}>
                                <div className="mb-5">
                                    <img src="https://assets.seracle.com/nodatagif3.gif" style={{ maxWidth: '10rem' }} alt="" />
                                </div>
                                <Button onClick={() => { navigate('/') }}>Buy NFTs</Button>
                            </div>
                        </Card>
                    }
                    {
                        loader && nfts.length > 0 &&
                        <div style={{ 'padding': '5rem 0rem' }}><Loader ></Loader></div>
                    }
                    {
                        !loader && nfts.length > 0 &&
                        <div style={{ 'display': 'grid', 'gridTemplateColumns': '1fr 1fr 1fr', 'gridGap': '5rem 0' }}>
                            {result}
                        </div>
                    }
                </div>
            </div>

        </>
    )
}

export default Collected