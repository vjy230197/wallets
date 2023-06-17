import React, { useState } from 'react';
import Web3 from 'web3';
import MyContract from './Contract.json';


function deployContract(contractName, constructorParams) {
    // Connect to a web3 provider (e.g., Metamask)
    const web3 = new Web3(window.ethereum);

    // Get the contract ABI and bytecode from the JSON file
    const contractABI = MyContract.abi;
    const contractBytecode = MyContract.bytecode;

    // const bytecodeHex = Buffer.from(contractBytecode, 'utf8').toString('hex');

    // Create a new instance of the contract
    const contract = new web3.eth.Contract(contractABI);

    // Deploy the contract with the provided parameters
    window.ethereum.enable()
        .then(accounts => {
            // The user has allowed access, and `accounts` contains the available Ethereum addresses
            const fromAddress = accounts[0]; // Use the first address by default or let the user choose
            // Deploy the contract using the `from` address
            contract.deploy({
                data: contractBytecode,
                arguments: ['a', 'b']
            })
                .send({
                    from: fromAddress,
                    gas: 4700000
                })
                .then((deployedContract) => {
                    console.log('Contract deployed at address:', deployedContract.options.address);
                    // Do something with the deployed contract
                })
                .catch((error) => {
                    console.error('Contract deployment failed:', error);
                    // Handle the error
                });
        })
        .catch(error => {
            console.error('Failed to connect to the web3 provider:', error);
            // Handle the connection error
        });
}

function ContractForm() {
    const [contractName, setContractName] = useState('');
    const [constructorParams, setConstructorParams] = useState('');

    const handleContractNameChange = (event) => {
        setContractName(event.target.value);
    };

    const handleConstructorParamsChange = (event) => {
        setConstructorParams(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Call a function to deploy the contract with the form data
        console.log({ contractName, constructorParams });
        deployContract(contractName, constructorParams);
    };

    return (
        <div style={{ padding: '10rem' }}>
            <form onSubmit={handleSubmit}>
                <label>
                    Contract Name:
                    <input type="text" value={contractName} onChange={handleContractNameChange} />
                </label>
                <br />
                <label>
                    Constructor Params:
                    <input type="text" value={constructorParams} onChange={handleConstructorParamsChange} />
                </label>
                <br />
                <button type="submit">Deploy Contract</button>
            </form>
        </div>

    );
}

export default ContractForm;