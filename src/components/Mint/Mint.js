import React, { useState } from 'react'
import classes from './Mint.module.css'
import { Button } from 'react-bootstrap';

const Mint = () => {

    const [previewImage, setPreviewImage] = useState()
    const [metadataUri, setMetadataUri] = useState('');


    const sumbit = async event => {

        const body = {
            name: 'ELON MUSK',
            image: 'https://cdn.britannica.com/05/236505-050-17B6E34A/Elon-Musk-2022.jpg',
            price: 0.05,
            description: 'Elon Reeve Musk is a business magnate and investor. He is the founder, CEO and chief engineer of SpaceX; angel investor, CEO and product architect of Tesla, Inc.; owner, CTO and chairman of Twitter'

        }

        const response = await fetch("http://localhost:1234/uploadFileIpfs", {
            body: JSON.stringify(body),
            method: 'POST',
            headers: { "Content-Type": "application/json", 'platform': 'web' }
        });

        if (response.status === 200) {

            const data = await response.json()
            const metadata_uri = data.data.metadata_uri;

            setMetadataUri(metadata_uri)

        } else {
            console.error('Something went wrong');
        }
    }

    const fileUpload = event => {
        console.log('event', event);
        const file = event.target.files[0]

        setPreviewImage(URL.createObjectURL(file))


        const formdata = new FormData();

        formdata.append('file', file);

        fetch('http://localhost:1234/uploadNftImage', {
            method: 'POST',
            body: formdata,
            headers: {
                'platform': 'web'
            }
        })
    }

    return (
        <>
            <div className='container' style={{ 'padding': '5rem' }}>
                <div className={classes.card}>

                    <div className='mb-3'>
                        <label className='flex py-2'>NFT Name</label>
                        <input type="text" className='me-3 ps-3' onChange={fileUpload} />
                    </div>

                    <div className='mb-3'>
                        <label className='flex py-2'>Price</label>
                        <div style={{ 'position': 'relative' }}>
                            <input type="number" className='me-3 ps-3' onChange={fileUpload} />
                            <span style={{ 'position': 'absolute', 'top': '12px', 'right': '1rem' }}>
                                <img src="https://assets.seracle.com/polygon-matic.svg" alt="" />
                            </span>
                        </div>
                    </div>

                    <div className='mb-3'>
                        <label className='flex py-2'>Description</label>
                        <textarea cols="5" rows='5' className='me-3 ps-3' onChange={fileUpload} />
                    </div>

                    <div className='mb-5'>
                        <label className='flex py-2'>NFT Image</label>
                        <input type="file" className='me-3 ps-3' onChange={fileUpload} />

                        <img className='mt-3 rounded-lg' src={previewImage} />
                    </div>

                    <div className="text-center">
                        <Button onClick={sumbit}>MINT</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mint