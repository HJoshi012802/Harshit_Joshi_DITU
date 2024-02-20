import {Route, Routes} from "react-router-dom";
import { Navbar } from "./layout/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Map } from "./pages/Map";

function App() {


  return (
   <Routes>
      <Route path='/' element={<Navbar/>}>
      <Route index element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path="/map" element={<Map/>}/>
      </Route>
   </Routes>
  )
}

export default App