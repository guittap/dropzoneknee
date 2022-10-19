import { CragEntry } from "./pages/CragEntry";
import { ClimbEntry } from "./pages/ClimbEntry";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
import { Climbs } from "./pages/Climbs";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/cragentry" element={<CragEntry />} />
        <Route path="/admin/climbentry" element={<ClimbEntry />} />
        <Route path="/admin/:cragId/:cragName" element={<Climbs />} />
        <Route path="/:cragId/:cragName" element={<Climbs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
