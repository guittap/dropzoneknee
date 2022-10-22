import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "./Styles";

export const AddButton = () => {
  const [isActive, setActive] = useState(false);
  const active = isActive ? "block" : "hidden";

  let handleClick = () => {
    setActive(!isActive);
  };

  return (
    <div className="max-w-[550px] mx-auto ">
      <div className="bottom-0 right-0 fixed text-right">
        <div className={`mr-3 ${active}`}>
          <div className="mb-2">
            <Button>
              <Link to="/admin/cragentry">
                <h1>Enter New Crag</h1>
              </Link>
            </Button>
          </div>
          <div className="mb-2">
            <Button>
              <Link to="/admin/climbentry">
                <h1>Enter New Climb</h1>
              </Link>
            </Button>
          </div>
        </div>
        <div className="right-0">
          <button className="text-primary" onClick={handleClick}>
            <AiFillPlusCircle size="60" />
          </button>
        </div>
      </div>
    </div>
  );
};
