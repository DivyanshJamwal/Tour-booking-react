import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState } from "react";
import './App.css';
import Navbar from "./components/common/Navbar"
import Home from "./screens/Home"
import Details from "./screens/Details"
import Reservation from "./screens/Reservation"
import Adventure from "./screens/Adventure"
import Signin from "./screens/Signin";

function App() {

  const [userInfo, setUserInfo] = useState({
    isSignin : false,
    userId : "",
    token : "",
    email : "",
    name : ""
  })

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
        <Route path="/signin" element={<Signin userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
        <Route path="/details/:id" element={<Details userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
        <Route path="/adventure/:id" element={<Adventure userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
        <Route path="/reservation" element={<Reservation userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
