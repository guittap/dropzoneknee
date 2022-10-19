import { Link } from "react-router-dom";
import { supabase } from "../client";
import { useState, useEffect } from "react";

export function Admin() {
  const [crags, setCrags] = useState([]);

  useEffect(() => {
    fetchCrags();
  }, []);

  async function fetchCrags() {
    const { data } = await supabase.from("crags").select();
    setCrags(data);
    //console.log("data: ", data)
  }

  return (
    <div className="Admin max-w-[1000px] mx-auto w-full mt-5 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        🥳 Wargen's 2023 Tick List 💯
      </h1>

      {crags.map((crag) => (
        <div key={crag.id}>
          <Link
            to={`/admin/${crag.id}/${crag.name
              .replace(/\s/g, "-")
              .toLowerCase()}`}
          >
            <h1>
              {crag.name}, {crag.location}
            </h1>
          </Link>
        </div>
      ))}

      <Link to="/admin/cragentry">Enter New Crag</Link>
      <br />
      <Link to="/admin/climbentry">Enter New Climb</Link>
    </div>
  );
}
