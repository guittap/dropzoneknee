import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="mx-auto flex bg-primary p-2 flex-wrap fixed w-full top-0 overflow-hidden">
      <div className="mx-auto text-center">
        <Link to="/admin">
          <img className="w-7 h-7" alt="logo" src="/logo.png" />
        </Link>
      </div>
    </nav>
  );
};
