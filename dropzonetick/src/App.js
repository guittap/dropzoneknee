import { CragEntry } from './pages/CragEntry'
import { ClimbEntry } from './pages/ClimbEntry'
import { Home } from './pages/Home'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './css/App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/CragEntry" element={<CragEntry/>}/>
        <Route path="/ClimbEntry" element={<ClimbEntry/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
