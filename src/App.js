import './App.css';
import Wallets from './components/Wallet/Wallets';
import NavBar from './Layout/NavBar';
import Footer from './Layout/Footer'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';

function App() {
    return (
        <div className="App">
            <NavBar />
            <div className='body'>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/wallets' element={<Wallets />}></Route>
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App;
