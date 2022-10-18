import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="Home">
      <Link to="/admin">admin</Link>
    </div>
  );
}
