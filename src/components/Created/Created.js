import React, { useState, useEffect } from 'react'
import classes from './Created.module.css'
import { ethers } from "ethers";
import Card from '../UI/Card';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetCreatedNfts } from '../../Features/Slices/CreatedNftsSlice'
import Loader from '../UI/Loader';


const Created = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const response = useSelector((state) => state.createdNfts)

    const nfts = response.nfts.data;
    const loading = response.loading

    console.log('+', nfts);

    useEffect(() => {
        dispatch(GetCreatedNfts())
    }, [])

    let result;
    if (nfts) {
        result = nfts.map((nft, index) => {
            return <Card key={index} maxWidth='20rem'>
                <div style={{ cursor: 'pointer' }} onClick={() => { navigate(`/nftdetails/${nft.nft_id}`) }}>
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
                            <Button>Update</Button>
                        </div>
                    </div>
                </div>
            </Card>
        })

    }

    return (
        <>
            <div className={classes.buyer}>
                <div>
                    {
                        !loading && nfts && nfts.length === 0 &&
                        <Card maxWidth='25rem' margin='auto'>
                            <div style={{ padding: '7rem' }}>
                                <div className="mb-5">
                                    <img src="https://assets.seracle.com/nodatagif3.gif" style={{ maxWidth: '10rem' }} alt="" />
                                </div>
                                <Button onClick={() => { navigate('/mint') }}>Add NFTs</Button>
                            </div>
                        </Card>
                    }
                    {
                        loading && nfts &&
                        <div style={{ 'padding': '5rem 0rem' }}><Loader /></div>
                    }
                    {
                        !loading && nfts &&
                        <div style={{ 'display': 'grid', 'gridTemplateColumns': '1fr 1fr 1fr', 'gridGap': '5rem 0' }}>
                            {result}
                        </div>
                    }
                </div>
            </div>

        </>
    )
}

export default Created