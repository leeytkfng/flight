import './App.css'
import {Route, Routes} from "react-router-dom";
import FlightList from "./pages/FlightList.jsx";
import FlightPage from "./pages/FlightPage.jsx";

function App() {
   return(
       <div>
           <Routes>
               <Route path="/" element={<FlightPage/>} />
           </Routes>
       </div>
  )
}

export default App
