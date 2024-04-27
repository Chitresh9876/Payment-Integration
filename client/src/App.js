import './App.css';
import Paymentsuccess from './components/Paymentsuccess';
import Home from './components/home/Home';
import {Routes, Route} from 'react-router-dom';
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/payment_success" element = {<Paymentsuccess/>}/>
    </Routes>
    </>
  );
}

export default App;
