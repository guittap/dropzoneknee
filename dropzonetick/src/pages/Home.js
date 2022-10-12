import {Link} from "react-router-dom"

export function Home() {
    return(
        <div className="Home">
            <Link to="/CragEntry">Enter New Crag</Link><br/>
            <Link to="/ClimbEntry">Enter New Climb</Link>

        </div>
    )}