import './App.css';
import Wallets from './components/Wallet/Wallets';
import NavBar from './components/NavBar';
import Footer from './components/Footer'

function App() {
    return (
        <div className="App">
            <NavBar />
            <Wallets />
            <Footer />
        </div>
    )
}

export default App;
