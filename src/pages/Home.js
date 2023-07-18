import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/UI/Card'
import classes from './Home.module.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllNfts } from '../Features/Slices/FetchNftsSlice'
import Loader from '../components/UI/Loader';

const Home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const response = useSelector((state) => state.getAllNfts)

    // console.log('+', response);

    const nfts = response.nfts.data;
    console.log('+ nfts', nfts);
    const loading = response.loading

    useEffect(() => {
        dispatch(GetAllNfts())
    }, [])

    // console.log('nfts', nfts);

    let result
    if (nfts) {
        result = nfts.map((nft, index) => {
            return <Card style={{ 'marginBottom': '5rem' }} item={nft} key={index} maxWidth='20rem' >
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
                            <Button>BUY</Button>
                        </div>
                    </div>
                </div>
            </Card>
        })
    }


    const style = { 'margin': 'auto', 'padding': '10rem 15rem', 'display': 'grid', 'gridTemplateColumns': '1fr 1fr 1fr', 'gridGap': '5rem 0' }
    return (
        <>
            {
                loading && <Loader></Loader>
            }
            {
                !loading && nfts && <div style={style}>
                    {result}
                </div>
            }
        </>
    )
}

export default Home