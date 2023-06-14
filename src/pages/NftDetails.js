import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import classes from './NftDetails.module.css'
import Card from '../components/UI/Card'
import Loader from '../components/UI/Loader'
import { Button } from 'react-bootstrap';

const NftDetails = (props) => {

    const nft_id = useParams().nftid;
    const [nft, setNft] = useState()

    const fetchPost = async () => {

        const body = {
            nft_id: nft_id
        }

        const response = await fetch("http://localhost:1234/nftDetails", {
            body: JSON.stringify(body),
            method: 'POST',
            headers: { "Content-Type": "application/json", 'platform': 'web' }
        });

        if (response.status === 200) {

            const json = await response.json()
            await setNft(json.data)

        } else {
            console.error('Something went wrong');
        }
    }

    useEffect(() => {
        if (nft_id)
            fetchPost()
    }, [nft_id])

    return (
        <>
            {
                nft && <div className={`${classes.nftdetails} + flex justify-between`}>
                    <div className={`${classes.left}`}>
                        <div className='mb-5'>
                            <Card maxWidth='35rem' margin='unset'>
                                <div className='px-3 py-3'>
                                    <img className='rounded' src={nft.image} alt="" />
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className={classes.right}>
                        <div className='text-left mb-3'>
                            <h2>{nft.name}</h2>
                        </div>
                        <div className='text-left mb-5'>
                            Owned by <a href={`https://mumbai.polygonscan.com/address/${nft.owner}`}>{nft.owner.substring(0, 15) + '...'}</a>
                        </div>
                        <div className='mb-5'>
                            <Card maxWidth='40rem' margin='unset'>
                                <div className='px-4 py-4'>
                                    <div className='text-left mb-3'>
                                        <h5>Buy it at</h5>
                                    </div>
                                    <div className={`${classes.price} + text-left mb-3`}>
                                        {nft.price} MATIC
                                    </div>
                                    <div className='text-left'>
                                        <Button className={classes.btn}>Buy</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className='mb-5'>
                            <Card maxWidth='40rem' margin='unset'>
                                <div className='px-4 py-4 text-left'>
                                    <h5>Description</h5>
                                </div>
                                <hr />
                                <div className='px-4 py-4'>
                                    <p className='text-left'>
                                        {nft.description}
                                    </p>
                                </div>
                            </Card>
                        </div>
                        <div className='mb-5'>
                            <Card maxWidth='40rem' margin='unset'>
                                <div className='px-4 py-4 text-left'>
                                    <h5>Details</h5>
                                </div>
                                <hr />
                                <div className='px-4 py-4'>
                                    <div className="flex justify-between mb-3">
                                        <div className={classes.key}>
                                            Contract Address
                                        </div>
                                        <div className={classes.value}>
                                            <a target="_blank" href={`https://mumbai.polygonscan.com/address/${nft.contract_address}`}>{nft.contract_address.substring(0, 15) + '...'}</a>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-3">
                                        <div className={classes.key}>
                                            Token ID
                                        </div>
                                        <div className={classes.value}>
                                            {nft.token_id}
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-3">
                                        <div className={classes.key}>
                                            Token Standard
                                        </div>
                                        <div className={classes.value}>
                                            ERC-721
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-3">
                                        <div className={classes.key}>
                                            Chain
                                        </div>
                                        <div className={classes.value}>
                                            MUMBAI
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

            }
            {
                !nft && <div style={{ 'padding': '20rem 0rem' }}><Loader ></Loader></div>
            }

        </>

    )
}

export default NftDetails