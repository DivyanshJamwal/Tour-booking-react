import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Navbar from "./components/common/Navbar"
import Home from "./screens/Home"
import Details from "./screens/Details"
import Reservation from "./screens/Reservation"
import Adventure from "./screens/Adventure"

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/details/:id" element={<Details/>}/>
        <Route path="/adventure/:id" element={<Adventure/>}/>
        <Route path="/reservation" element={<Reservation/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;