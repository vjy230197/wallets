import './App.css';
import SignClient from '@walletconnect/sign-client';
import { Web3Modal } from '@web3modal/standalone';
import { useEffect, useState } from "react";

const projectId = '53e037a7c58326ae950e9c929cd78720'

const web3Modal = new Web3Modal({
    projectId: projectId,
    standaloneChains: ["eip155:1"],
    walletConnectVersion: 2,
    themeMode: "dark",
    themeVariables: {
        "--w3m-font-family": "Roboto, sans-serif",
        "--w3m-accent-color": "yellow"
    }
});

function App() {
    const [signClient, setSignClient] = useState();
    const [sessions, setSessions] = useState([]);
    const [accounts, setAccounts] = useState([]);

    async function createClient() {
        try {
            const client = await SignClient.init({
                projectId: projectId
            });
            setSignClient(client);
            subscribeToEvents(client)
        }
        catch (e) {
            console.error(e);
        }
    }

    async function handleConnect() {
        if (!signClient)
            throw new Error('Cannot connect. Sign Client is not created.')

        try {
            const namespaces = {
                //eth mainnet
                eip155: {
                    methods: ["eth_sendTransaction"],
                    chains: ["eip155:1"],
                    events: ["connect", "disconnect", "accountsChanged"],
                },
            };
            const { uri, approval } = await signClient.connect({
                requiredNamespaces: namespaces,
            });

            if (uri) {
                web3Modal.openModal({
                    uri,
                });
                const sessionNamespace = await approval();
                onSessionConnect(sessionNamespace);
                web3Modal.closeModal()
            }
        }

        catch (e) {
            console.error(e);
        }
    }

    async function onSessionConnect(session) {
        if (!session)
            throw new Error('Session does not exist.')

        try {
            setSessions(session)
            setAccounts(session.namespaces.eip155.accounts[0].slice(9))
        }
        catch (e) {
            console.error(e);
        }
    }

    async function handleDisconnect() {
        try {
            await signClient.disconnect({
                topic: sessions.topic,
                code: 6000,
                message: 'User disconnected.'
            })
            reset()
        }
        catch (e) {
            console.error(e);
        }
    }

    async function subscribeToEvents(client) {
        if (!client)
            throw new Error('No events if not client.')

        try {
            client.on("session_delete", () => {
                console.log('User disconnected their session from their wallet.');
                reset()
            })
        }
        catch (e) {
            console.error(e);
        }
    }

    const reset = () => {
        setAccounts([]);
        setSessions([])
    }

    useEffect(() => {
        if (!signClient)
            createClient();
    }, [signClient]);

    return (
        <div className="App">

            {accounts.length ? (<>

                <p>{accounts}</p>
                <button onClick={handleDisconnect}>Disconnect</button>
            </>) :
                <button onClick={handleConnect} disabled={!signClient}>Connect</button>}
        </div>
    )
}

export default App;
