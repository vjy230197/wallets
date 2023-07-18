import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classes from './NftDetails.module.css'
import Card from '../components/UI/Card'
import Loader from '../components/UI/Loader'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getNftDetails } from '../Features/Slices/NftDetailsSlice'

const mintAbiArray = require('../abis/mintAbiArray');

const NftDetails = (props) => {

    const dispatch = useDispatch()
    let accounts = localStorage.getItem('address');
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()
    const nft_id = useParams().nftid;

    const [balance, setBalance] = useState();
    const [transferHash, setTransferHash] = useState()

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    useEffect(() => {
        dispatch(getNftDetails(nft_id));
        getBalance();
    }, [])

    const response = useSelector((state) => state.nftDetails)

    const loading = response.loading;
    const nft = response.item.data

    const getBalance = async () => {
        const balance = await provider.getBalance(accounts);
        const nativeBalance = ethers.utils.formatEther(balance);

        await setBalance(nativeBalance)
    }

    const buyNft = async () => {

        try {
            setLoader(true)
            const decimals = 18;
            const input = (nft.current_price).toString(); // Note: this is a string, e.g. user input
            const amount = ethers.utils.parseUnits(input, decimals)

            const contract = new ethers.Contract(nft.contract_address, mintAbiArray, signer);

            const gasLimit = 200000;
            const gasPrice = ethers.utils.parseUnits("50", "gwei");

            const result = await contract.connect(signer).transferNft(nft.token_id, nft.minter, accounts, {
                value: amount,
                gasLimit: gasLimit,
                gasPrice: gasPrice,
            })

            setTransferHash(result.hash)
            // setTransferHash('0xd7bfcf32b743556a809dbe832c8a1c10f10844d118f5432f2164ef78e261b231')
            setLoader(false)
        }

        catch (e) {
            setLoader(false)
            console.log(e);
        }
    }

    const updateOrder = async () => {
        try {
            const body = {
                nft_id: nft_id,
                address: accounts,
                transaction_hash: transferHash,
                current_owner: nft.current_owner
            }

            const response = await fetch("http://localhost:1234/buyNft", {
                body: JSON.stringify(body),
                method: 'POST',
                headers: { "Content-Type": "application/json", 'platform': 'web' }
            });

            if (response.status === 200) {
                console.log("order updated.");
            } else {
                console.error('Something went wrong');
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (transferHash) {
            updateOrder()
        }
    }, [transferHash])

    let activity;
    if (nft) {
        activity = nft.history.map((item, index) => {
            return <tr key={index}>
                <td>{item.status.toUpperCase()}</td>
                <td>{<a target="_blank" href={`https://mumbai.polygonscan.com/tx/${item.from}`}>{item.from.substring(0, 6) + '...' + item.from.substring(item.from.length - 4, item.from.length)}</a>}</td>
                <td>{<a target="_blank" href={`https://mumbai.polygonscan.com/tx/${item.to}`}>{item.to.substring(0, 6) + '...' + item.to.substring(item.to.length - 4, item.to.length)}</a>}</td>
                <td>{new Date(item.created).toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )}</td>
                <td>{<a target="_blank" href={`https://mumbai.polygonscan.com/tx/${item.hash}`}>{item.hash.substring(0, 6) + '...' + item.hash.substring(item.hash.length - 4, item.hash.length)}</a>}</td>
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
                                        <img className='rounded w-full' src={nft.image} alt="" />
                                    </div>
                                </Card>
                            </div>
                        </div>
                        {
                            (!transferHash && loader) &&
                            <div className={classes.right}>
                                <Card maxWidth='40rem' margin='unset'>
                                    <div style={{ 'padding': '20rem 0rem' }}>
                                        <Loader ></Loader>
                                    </div>
                                </Card>
                            </div>
                        }
                        {
                            (!transferHash && !loader) &&
                            <div className={classes.right}>
                                <div className={`${classes.price} + text-left mb-3`}>
                                    {nft.name}
                                </div>
                                <div className='text-left mb-5'>
                                    {accounts !== nft.current_owner &&
                                        <div>
                                            Owned by <a target="_blank" href={`https://mumbai.polygonscan.com/address/${nft.current_owner}`}>{nft.current_owner.substring(0, 6) + '...' + nft.current_owner.substring(nft.current_owner.length - 4, nft.current_owner.length)}</a>
                                        </div>
                                    }
                                    {
                                        accounts === nft.current_owner && accounts !== nft.minter &&
                                        <div>
                                            You own this.
                                        </div>
                                    }
                                    {
                                        accounts === nft.minter &&
                                        <div>
                                            You minted this.
                                        </div>
                                    }
                                </div>
                                <div className='mb-5'>
                                    <Card maxWidth='40rem' margin='unset'>
                                        <div className='px-4 py-4 flex justify-between'>
                                            <div style={{ width: '100%', 'margin': 'auto' }}>

                                                {/* Buyer checking nft */}
                                                {
                                                    accounts !== nft.minter && accounts !== nft.current_owner &&
                                                    <div>
                                                        <div className='text-left mb-3'>
                                                            <h5>Buy it at</h5>
                                                        </div>
                                                        <div className={`${classes.price} + text-left mb-3`}>
                                                            {nft.current_price} MATIC
                                                        </div>
                                                        <div className='text-left'>
                                                            <Button className={classes.btn} onClick={buyNft}>Buy</Button>
                                                        </div>
                                                    </div>
                                                }

                                                {/* Current owner checking collected nfts  */}
                                                {
                                                    accounts !== nft.minter && accounts === nft.current_owner &&
                                                    <div>
                                                        <div className='text-left'>
                                                            <Button className={classes.btn} disabled={true}>Sell Now</Button>
                                                        </div>
                                                    </div>
                                                }

                                                {/* Seller checking created nfts, is transferred. */}
                                                {
                                                    accounts === nft.minter && accounts !== nft.current_owner &&
                                                    <div>
                                                        <div className='text-left'>
                                                            <Button className={classes.btn} disabled={true}>Sold Out</Button>
                                                        </div>
                                                    </div>
                                                }

                                                {/* Seller minted, still has ownership. */}
                                                {
                                                    accounts === nft.minter && accounts === nft.current_owner &&
                                                    <div>
                                                        <div className='text-left'>
                                                            <Button className={classes.btn} disabled={true}>Disable</Button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div className={classes.line}>
                                            </div>
                                            <div style={{ width: '100%', margin: 'auto' }}>
                                                <div className='mb-4'>
                                                    <span style={{ 'cursor': 'pointer' }}>{accounts.substring(0, 6) + '...' + accounts.substring(accounts.length - 4, accounts.length)}</span>
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
                                                    <a target="_blank" href={`https://mumbai.polygonscan.com/address/${nft.contract_address}`}>{nft.contract_address.substring(0, 6) + '...' + nft.contract_address.substring(nft.contract_address.length - 4, nft.contract_address.length)}</a>
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
                        }
                        {
                            transferHash &&
                            <div className={classes.right}>
                                <Card maxWidth='30rem' margin='auto'>
                                    <div className='px-5 py-5'>
                                        <div className='flex justify-center mb-5'>
                                            <img style={{ 'maxWidth': '11rem' }} src="https://assets.seracle.com/onlinegiftools.gif" alt="" />
                                        </div>
                                        <div className='mb-5'>
                                            <h3>NFT Transferred</h3>
                                        </div>
                                        <div className='flex justify-between mb-2'>
                                            <div>Transaction Hash</div>
                                            <span>
                                                <a target="_blank" href={`https://mumbai.polygonscan.com/tx/${transferHash}`}>{transferHash.substring(0, 6) + '...' + transferHash.substring(transferHash.length - 4, transferHash.length)}</a>
                                            </span>
                                        </div>
                                        <div className='flex justify-between mb-5'>
                                            <div>Contract Address</div>
                                            <span>
                                                <a target="_blank" href={`https://mumbai.polygonscan.com/address/${nft.contract_address}`}>{nft.contract_address.substring(0, 6) + '...' + nft.contract_address.substring(nft.contract_address.length - 4, nft.contract_address.length)}</a>
                                            </span>
                                        </div>
                                        <div>
                                            <Button onClick={() => navigate('/')}>Homepage</Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        }
                    </div>
                    <div>
                        {
                            (!transferHash && !loader) &&
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
                        }

                    </div>
                </div>
            }
            {/* {
                !nft && <div style={{ 'padding': '20rem 0rem' }}><Loader ></Loader></div>
            } */}

        </>

    )
}

export default NftDetails