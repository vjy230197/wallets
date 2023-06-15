import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/UI/Card'
import classes from './Home.module.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const [nfts, setNfts] = useState([])
    const API = 'http://localhost:1234/getNfts';
    const fetchPost = () => {
        fetch(API, {
            headers: { 'platform': 'web' }
        })
            .then((res) => res.json())
            .then((res) => {
                setNfts(res.data)
            })
    }
    useEffect(() => {
        fetchPost()
    }, [])

    const result = nfts.map((nft, index) => {
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
                            {nft.price} MATIC
                        </span>
                    </div>
                    <div>
                        <Button>BUY</Button>
                    </div>
                </div>
            </div>
        </Card>
    })

    const style = { 'margin': 'auto', 'padding': '10rem 15rem', 'display': 'grid', 'gridTemplateColumns': '1fr 1fr 1fr', 'gridGap': '5rem 0' }
    return (
        <div style={style}>
            {result}
        </div>
    )
}

export default Home