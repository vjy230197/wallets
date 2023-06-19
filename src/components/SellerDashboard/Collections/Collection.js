import React, { useState, useEffect } from 'react'
import classes from './Collection.module.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from '../../UI/Card';

const Collection = () => {
    const navigate = useNavigate();

    const [collections, setCollections] = useState([])

    const getcollections = async () => {
        const body = {
            address: localStorage.getItem('address')
        }
        const response = await fetch("http://localhost:1234/createdCollections", {
            body: JSON.stringify(body),
            method: 'POST',
            headers: { "Content-Type": "application/json", 'platform': 'web' }
        });

        if (response.status === 200) {
            const json = await response.json()
            await setCollections(json.data)
        } else {
            console.error('Something went wrong');
        }
    }

    useEffect(() => {
        getcollections()
    }, [])

    const result = collections.map((item, i) => {
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

    return (
        <>
            <div className={classes.collections_wrapper}>
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

            </div>
        </>
    )
}

export default Collection