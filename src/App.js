import './App.css';
import SignClient from '@walletconnect/sign-client'
import { Web3Modal } from '@web3modal/standalone'
import { useEffect, useState } from "react";

const projectId = '53e037a7c58326ae950e9c929cd78720'

const web3Modal = new Web3Modal({
    projectId: projectId,
    walletConnectVersion: 2,
});

function App() {
    const [signClient, setSignClient] = useState(undefined);

    async function onInitializeSignClient() {
        const client = await SignClient.init({
            projectId: projectId
        });
        setSignClient(client);
    }

    async function onOpenModal() {
        if (signClient) {
            const namespaces = {
                eip155: {
                    methods: ["eth_sign"],
                    chains: ["eip155:1"],
                    events: ["accountsChanged"],
                },
            };
            const { uri, approval } = await signClient.connect({
                requiredNamespaces: namespaces,
            });
            if (uri) {
                await web3Modal.openModal({
                    uri,
                    standaloneChains: namespaces.eip155.chains,
                });
                await approval();
                web3Modal.closeModal();
            }
        }
    }

    useEffect(() => {
        onInitializeSignClient();
    }, []);

    // return (
    //     <>
    //         asdf
    //     </>
    // );
    return signClient ? (
        <button onClick={onOpenModal}>Connect Wallet</button>
    ) : (
        "Initializing..."
    );
}

export default App;
