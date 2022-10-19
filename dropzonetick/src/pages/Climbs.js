import { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";

export function Climbs() {
  const [cragID] = window.location.href.split("/").slice(-2);
  const [crag, setCrag] = useState();
  const [climbs, setClimbs] = useState([]);

  useEffect(() => {
    fetchCrag();
    fetchClimbs();
  });

  async function fetchCrag() {
    const { data } = await supabase.from("crags").select();
    setCrag(
      data.find((obj) => {
        return obj.id === +cragID;
      }).name
    );
    //finds the name of the crag
    //you know after some thinking i realized I could've just used the URL to get the crag name
    //console.log("data: ", data)
  }

  async function fetchClimbs() {
    const { data } = await supabase
      .from("climbs")
      .select()
      .eq("location_name", crag);
    setClimbs(data);
    //console.log("data: ", data)
  }

  return (
    <div className="Climbs max-w-[1000px] mx-auto w-full mt-5 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {crag}
      </h1>
      {climbs.map((climb) => (
        <div key={climb.id}>
          <span className="font-bold mr-2 align-center">
            {climb.name} {climb.grade}
          </span>
          <span className="mr-2 text-yellow-500 align-center">
            {"★".repeat(climb.rating)}
          </span>
        </div>
      ))}
      <Link to="/admin/climbentry">Enter New Climb</Link>
    </div>
  );
}
