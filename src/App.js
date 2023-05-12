import './App.css';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react';

const chains = [arbitrum, mainnet, polygon]
const projectId = '53e037a7c58326ae950e9c929cd78720'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
function App() {
    return (
        <>
            <WagmiConfig config={wagmiConfig}>
                <Web3Button />
            </WagmiConfig>

            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </>
    );
}

export default App;
