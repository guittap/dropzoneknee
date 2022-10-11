import { CragEntry } from './pages/CragEntry'
import { Home } from './pages/Home'
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/CragEntry" element={<CragEntry/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
