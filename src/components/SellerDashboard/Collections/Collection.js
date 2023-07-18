import React, { useState, useEffect } from 'react'
import classes from './Collection.module.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from '../../UI/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getCreatedCollections } from '../../../Features/Slices/FetchCollectionSlice';
import Loader from '../../UI/Loader';

const Collection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const response = useSelector((state) => state.getAllCollection)

    const collections = response.collections.data;
    const loading = response.collections.loading;

    useEffect(() => {
        dispatch(getCreatedCollections())
    }, [])

    let result;

    if (collections) {
        result = collections.map((item, i) => {
            return (<div key={i}>
                <Card maxWidth='20rem' margin='unset'>
                    <div className={classes.zoom_effect}>
                        <img src={item.logo_img} alt="" />
                    </div>
                    <div className='px-3 py-3 flex'>
                        <div className={classes.logo_wrapper}>
                            <span className={classes.logo_wrapper_inner}>
                                <img src={item.logo_img} alt="" />
                            </span>
                        </div>
                        <div className='ms-4'>
                            <h3>{item.name}</h3>
                        </div>
                    </div>
                </Card>
            </div>)
        })
    }

    return (
        <>
            {
                loading && <Loader />
            }
            {
                !loading && collections && <div className={classes.collections_wrapper}>
                    <div className='text-left mb-4'>
                        <h2>My Collections</h2>
                    </div>
                    <div className='text-left mb-5'>
                        Create, curate, and manage collections of unique NFTs to share and sell.
                    </div>
                    <div className='text-left mb-5'>
                        <Button className={classes.btn} onClick={() => { navigate('/addCollection') }}>Create a Collection</Button>
                    </div>
                    {
                        collections.length > 0 && <div className={`${classes.collections}`}> {result}</div>
                    }

                    {
                        collections.length == 0 && <div>
                            <Card maxWidth='25rem' margin='auto'>
                                <div style={{ padding: '7rem' }}>
                                    <div className="mb-5">
                                        <img src="https://assets.seracle.com/nodatagif3.gif" style={{ maxWidth: '10rem' }} alt="" />
                                    </div>
                                    <Button onClick={() => { navigate('/addCollection') }}>Create</Button>
                                </div>
                            </Card>
                        </div>
                    }

                </div>
            }

        </>
    )
}

export default Collection