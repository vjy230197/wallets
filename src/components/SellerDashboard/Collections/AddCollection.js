import React, { useState } from 'react'
import Card from '../../UI/Card'
import Loader from '../../UI/Loader';
import classes from './AddCollection.module.css'
import { Button } from 'react-bootstrap';
import Web3 from 'web3';
import MyContract from '../../Contract/Contract.json';
import { useNavigate } from 'react-router-dom';

const AddCollection = () => {
    const [imageUrl, setImageUrl] = useState();
    const [collectionName, setCollectionName] = useState();
    const [symbol, setSymbol] = useState();
    const [contractAddress, setContractAddress] = useState()
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

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

    const descriptionChangeHandler = event => {
        setDescription(event.target.value)
    }

    const deployContract = () => {
        const web3 = new Web3(window.ethereum);

        const contractABI = MyContract.abi;
        const contractBytecode = MyContract.bytecode;

        const contract = new web3.eth.Contract(contractABI);
        // setContractAddress('0x004e922EdE91566d79Cb48E375f08fDdC09C44E7')
        window.ethereum.enable()
            .then(accounts => {
                const fromAddress = localStorage.getItem('address')
                contract.deploy({
                    data: contractBytecode,
                    arguments: [collectionName, symbol]
                })
                    .send({
                        from: fromAddress,
                        gas: 4700000
                    })
                    .then((deployedContract) => {
                        setContractAddress(deployedContract.options.address)
                        console.log('Contract deployed at address:', contractAddress);
                    })
                    .catch((error) => {
                        console.error('Contract deployment failed:', error);
                    });
            })
            .catch(error => {
                console.error('Failed to connect to the web3 provider:', error);
            });
    }

    const saveDetails = async () => {
        const body = {
            address: localStorage.getItem('address'),
            contract_address: contractAddress,
            description: description,
            logo_img: imageUrl,
            symbol: symbol,
            collection_name: collectionName
        }

        const response = await fetch("http://localhost:1234/addCollection", {
            body: JSON.stringify(body),
            method: 'POST',
            headers: { "Content-Type": "application/json", 'platform': 'web' }
        });

        if (response.status === 200) {
            navigate('/dashboard');

        } else {
            console.error('Something went wrong');
        }
    }


    return (
        <>
            <div className={classes.add_collection}>
                <Card maxWidth='40rem'>
                    <div className="px-4 py-4">
                        {
                            !contractAddress &&
                            <div>
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
                                    <Button className={classes.btn} onClick={deployContract}>Deploy Contract</Button>
                                </div>
                            </div>
                        }
                        {
                            contractAddress &&
                            <div>
                                <div className='text-left mb-3'>
                                    <h3>Collection Details</h3>
                                </div>
                                <div className="mb-4">
                                    <div className={`${classes.label} + mb-3`}>Name</div>
                                    <input readOnly value={collectionName} type="text" className={`${classes.input} + me-3 ps-3`} />
                                </div>
                                <div className='mb-5'>
                                    <div className={`${classes.label} + mb-3`}>Description</div>
                                    <textarea placeholder='Add a Description' value={description} cols="5" rows='5' className={classes.textarea} onChange={descriptionChangeHandler} />
                                </div>
                                <div>
                                    <Button className={classes.btn} onClick={saveDetails}>Save Collection</Button>
                                </div>
                            </div>
                        }
                    </div>
                </Card>
            </div>
        </>
    )
}

export default AddCollection