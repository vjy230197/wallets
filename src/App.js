import './App.css';
import Wallets from './components/Wallet/Wallets';
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';

function App() {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/wallets' element={<Wallets />}></Route>
            </Routes>
            <Footer />
        </div>
    )
}

export default App;
