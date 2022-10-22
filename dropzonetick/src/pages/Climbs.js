import { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function Climbs() {
  const [cragID] = window.location.href.split("/").slice(-2);
  const [crag, setCrag] = useState();
  const [climbs, setClimbs] = useState([]);
  const isAdmin = window.location.href.split("/").slice(-3)[0] === "admin";

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
    <div className="mx-auto w-full">
      {isAdmin ? <Navbar /> : ""}
      <div className="Climbs max-w-[1000px] mt-14 text-center mx-auto w-full">
        <h1 className="mb-5 text-2xl font-bold tracking-tight">{crag}</h1>
        {climbs.map((climb) => (
          <div key={climb.id} className="mb-2">
            <span className="font-bold mr-2 align-center">
              {climb.name} {climb.grade}
            </span>
            <span className="text-yellow align-center">
              {"★".repeat(climb.rating)}
            </span>
            <span className="mr-2 text-lightgray align-center">
              {"★".repeat(5 - climb.rating)}
            </span>
          </div>
        ))}
        {isAdmin ? <Link to="/admin/climbentry">Enter New Climb</Link> : ""}
      </div>
    </div>
  );
}
