import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classes from './NftDetails.module.css'
import Card from '../components/UI/Card'
import Loader from '../components/UI/Loader'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import { ethers } from "ethers";
const mintAbiArray = require('../abis/mintAbiArray')

const NftDetails = (props) => {

    const nft_id = useParams().nftid;
    const [nft, setNft] = useState()
    const [accounts, setAccount] = useState([]);
    const [balance, setBalance] = useState()

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const CONTRACT_ADDRESS = '0x56716b82f27a6c71CCb7Cc7cDFC1549f408407a8'

    const contract = new ethers.Contract(CONTRACT_ADDRESS, mintAbiArray, signer);

    let activity;

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


    const connectMetamask = async () => {
        if (window.ethereum) {

            window.ethereum.request({
                method: 'eth_requestAccounts'
            }).then((result) => {
                accountChangedHandler(result[0])

            }).catch((error) => {
                console.error(error);
            });
        }
        else {
            console.log('no metamask installed.');
        }
    }

    const accountChangedHandler = async (account) => {
        setAccount(account)

        const balance = await provider.getBalance(account);
        const nativeBalance = ethers.utils.formatEther(balance);

        await setBalance(nativeBalance)
    }

    const buyNft = async () => {

        try {
            const decimals = 18;
            const input = (nft.price).toString(); // Note: this is a string, e.g. user input
            const amount = ethers.utils.parseUnits(input, decimals)

            console.log('amount', amount);
            const result = await contract.connect(signer).transferNft(nft.minter, accounts, nft.token_id, amount, {
                value: amount
            })

            console.log('result', result);
        }

        catch (e) {
            console.log(e);
        }
    }

    if (nft) {
        activity = nft.history.map((item, index) => {
            return <tr key={index}>
                <td>{item.type.toUpperCase()}</td>
                <td>{<a target="_blank" href={`https://mumbai.polygonscan.com/tx/${item.from}`}>{item.from.substring(0, 15) + '...'}</a>}</td>
                <td>{<a target="_blank" href={`https://mumbai.polygonscan.com/tx/${item.to}`}>{item.to.substring(0, 15) + '...'}</a>}</td>
                <td>{item.created}</td>
                <td>{<a target="_blank" href={`https://mumbai.polygonscan.com/tx/${item.hash}`}>{item.hash.substring(0, 15) + '...'}</a>}</td>
            </tr>
        })
    }



    return (
        <>
            {
                nft && <div className={classes.nftdetails}>
                    <div className=' flex justify-between'>
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
                            <div className={`${classes.price} + text-left mb-3`}>
                                {nft.name}
                            </div>
                            <div className='text-left mb-5'>
                                Owned by <a href={`https://mumbai.polygonscan.com/address/${nft.minter}`}>{nft.minter.substring(0, 15) + '...'}</a>
                            </div>
                            <div className='mb-5'>
                                <Card maxWidth='40rem' margin='unset'>
                                    <div className='px-4 py-4 flex justify-between'>
                                        <div style={{ width: '100%' }}>
                                            <div className='text-left mb-3'>
                                                <h5>Buy it at</h5>
                                            </div>
                                            <div className={`${classes.price} + text-left mb-3`}>
                                                {nft.price} MATIC
                                            </div>
                                            <div className='text-left'>
                                                <Button className={classes.btn} onClick={buyNft}>Buy</Button>
                                            </div>
                                        </div>
                                        <div className={classes.line}>
                                        </div>
                                        <div style={{ width: '100%', margin: 'auto' }}>
                                            <div className='mb-4' onClick={connectMetamask}>
                                                {accounts.length === 0 && (<span style={{ 'cursor': 'pointer' }} onClick={connectMetamask}>Connect</span>)}
                                                {accounts.length > 0 && (<span style={{ 'cursor': 'pointer' }}>{accounts.substring(0, 15) + '...'}</span>)}
                                            </div>
                                            <hr />
                                            {accounts && <div className='flex justify-center mt-4'>
                                                <img className='me-3' src="https://assets.seracle.com/polygon-matic.svg" style={{ maxWidth: '1.5rem' }} alt="" />
                                                <span>{balance}</span>
                                            </div>}

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
                    <div>
                        <div>
                            {nft && <Card maxWidth='unset' margin='unset'>
                                <div className='px-4 py-4 text-left'>
                                    <h5>Activity</h5>
                                </div>
                                <hr />
                                <div className='px-4 py-4'>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Event</th>
                                                <th>From</th>
                                                <th>To</th>
                                                <th>Time</th>
                                                <th>Tx</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {activity}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card>}
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