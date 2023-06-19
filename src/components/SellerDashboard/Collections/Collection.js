import React from 'react'
import classes from './Collection.module.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Collection = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={classes.collections}>
                <div className='text-left mb-4'>
                    <h2>My Collections</h2>
                </div>
                <div className='text-left mb-5'>
                    Create, curate, and manage collections of unique NFTs to share and sell.
                </div>
                <div className='text-left'>
                    <Button className={classes.btn} onClick={() => { navigate('/addCollection') }}>Create a Collection</Button>
                </div>
            </div>
        </>
    )
}

export default Collection