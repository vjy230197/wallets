import React, { useState } from 'react'
import Card from '../../UI/Card'
import Loader from '../../UI/Loader';
import classes from './AddCollection.module.css'
import { Button } from 'react-bootstrap';

const AddCollection = () => {
    const [imageUrl, setImageUrl] = useState();
    const [collectionName, setCollectionName] = useState();
    const [symbol, setSymbol] = useState();

    const fileUpload = async event => {
        const file = event.target.files[0]
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

        } else {
            console.error('Something went wrong');
        }
    }

    const collectionNameHandler = event => {
        setCollectionName(event.target.value)
    }

    const symbolNameHandler = event => {
        setSymbol(event.target.value)
    }

    return (
        <>
            <div className={classes.add_collection}>
                <Card maxWidth='40rem'>
                    <div className="px-4 py-4">
                        <div className='text-left mb-3'>
                            <h3>Create a collection</h3>
                        </div>
                        <div className='text-left mb-4'>
                            Deploying your own contract requires uploading your <br /> metadata outside of OpenSea.
                        </div>

                        <div className='mb-4'>
                            <div className={`${classes.label} + mb-3`}>Logo image</div>
                            <div className={classes.logo_wrapper}>
                                <div className={`${classes.box} + mb-3`}>
                                    {imageUrl && <img src={imageUrl} alt="" />}
                                    {!imageUrl && <input className={classes.input_file} type="file" onChange={fileUpload} />}
                                </div>
                                <div>
                                    350 x 350 px recommended
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className={`${classes.label} + mb-3`}>Name</div>
                            <input placeholder='My Collection Name' value={collectionName} type="text" className={`${classes.input} + me-3 ps-3`} onChange={collectionNameHandler} />
                        </div>
                        <div className="mb-5">
                            <div className={`${classes.label} + mb-3`}>Token Symbol</div>
                            <div className='text-left mb-3'>
                                The token symbol is shown on the block explorer when others view your smart contract.
                            </div>
                            <input placeholder='MCN' value={symbol} type="text" className={`${classes.input} + me-3 ps-3`} onChange={symbolNameHandler} />
                        </div>
                        <div>
                            <Button className={classes.btn}>Deploy Contract</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default AddCollection