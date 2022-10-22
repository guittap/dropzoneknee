import { Link } from "react-router-dom";
import { supabase } from "../client";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { GiCrags } from "react-icons/gi";
import { AddButton } from "../components/AddButton";

export function Admin() {
  const [crags, setCrags] = useState([]);
  const [climbs, setClimbs] = useState([]);

  useEffect(() => {
    fetchCrags();
    fetchClimbs();
  }, []);

  async function fetchCrags() {
    const { data } = await supabase.from("crags").select();
    setCrags(data);
    //console.log("data: ", data)
  }

  async function fetchClimbs() {
    const { data } = await supabase.from("climbs").select();
    setClimbs(data);
    console.log(
      data.filter((climb) => (climb.location_name === "Kraft" ? true : false))
        .length
    );
  }

  return (
    <div className="Admin mx-auto w-full">
      <Navbar />
      <div className="max-w-[550px] mx-auto w-full mt-14 text-center">
        <div className="CragCard mx-3">
          {crags.map((crag) => (
            <div key={crag.id}>
              <Link
                to={`/admin/${crag.id}/${crag.name
                  .replace(/\s/g, "-")
                  .toLowerCase()}`}
              >
                <div className="p-3 rounded overflow-hidden shadow-md mb-3 mx-auto bg-white flex flex-wrap">
                  <div className="text-left items-center my-auto mr-3">
                    <GiCrags size={40} />
                  </div>

                  <div className="text-left">
                    <h1 className="font-bold">
                      {crag.name}, {crag.location}
                    </h1>
                    <p className="italic text-green">
                      # of climbs:{" "}
                      {
                        climbs.filter((climb) =>
                          climb.location_name === crag.name ? true : false
                        ).length
                      }
                    </p>
                  </div>

                  <div className="text-right mx-auto">
                    {/* <p className="italic text-red">
                      # remaining:{" "}
                      {
                        climbs.filter((climb) =>
                          climb.location_name === crag.name ? true : false
                        ).length
                      }
                    </p> */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <AddButton />
    </div>
  );
}
