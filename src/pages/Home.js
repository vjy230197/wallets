import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/UI/Card'
import classes from './Home.module.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllNfts } from '../Features/Slices/Nfts/AllNftsSlice'
import Loader from '../components/UI/Loader';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(0);
    const [nfts, setNfts] = useState([]);

    const response = useSelector((state) => state.getAllNfts);

    const totalNftsCount = response.totalCount;
    const loading = response.loading;

    // Pagination
    const limit = 10;
    const data = {
        page: currentPage,
        limit: limit,
    };

    useEffect(() => {
        dispatch(GetAllNfts(data));
    }, [currentPage]);

    // Update the nfts state whenever the response changes
    useEffect(() => {
        setNfts((prevNfts) => [...prevNfts, ...response.nfts]);
    }, [response.nfts]);

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    let result
    if (nfts) {
        result = nfts.map((nft, index) => {
            return <Card style={{ 'marginBottom': '5rem' }} item={nft} key={index} maxWidth='20rem' >
                <div style={{ cursor: 'pointer' }} onClick={() => { navigate(`/nftdetails/${nft.nft_id}`) }}>
                    <div className={classes.zoom_effect}>
                        <img src={nft.image_url} alt="" />
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
            {nfts.length < totalNftsCount && (
                <div className='py-20'>
                    <Button onClick={nextPage}>Load More</Button>
                </div>
            )}
        </>
    )
}

export default Home