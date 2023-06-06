import './App.css';
import Wallets from './components/Wallet/Wallets';
import NavBar from './Layout/NavBar';
import Footer from './Layout/Footer'
import { Route, Routes, Switch } from "react-router-dom";
import Home from './pages/Home';
import Todo from './components/ToDo/Todo';
import DropdownSelect from './components/Dropdown/DropdownSelect';
import Counter from './components/Counter/Counter';
import Timer from './components/Timer/Timer';
import ManualCounter from './components/Counter/ManualCounter';

function App() {
    return (
        <div className="App">
            <NavBar />
            <div className='body'>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/wallets' element={<Wallets />}></Route>
                    {/* <Route path='/tasks' element={<Todo />}></Route>
                    <Route path='/dropdown-select' element={<DropdownSelect />}></Route>
                    <Route path='/counter' element={<Counter />}></Route>
                    <Route path='/manual-counter' element={<ManualCounter />}></Route>
                    <Route path='/timer' element={<Timer />}></Route> */}
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App;
