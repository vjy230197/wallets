import React, { useState, useEffect } from 'react'
import classes from './Collected.module.css'
import { ethers } from "ethers";
import Card from '../../UI/Card';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../../UI/Loader'

const Collected = () => {
    const navigate = useNavigate();

    let accounts = localStorage.getItem('address');

    const [nfts, setNfts] = useState([])
    const [loader, setLoader] = useState(false)

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
        collectedNfts()
    }, [])


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
                <div>
                    {
                        !loader && nfts.length === 0 &&
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