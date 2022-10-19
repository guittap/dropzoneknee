import { useState, useEffect } from "react";
import { supabase } from "../client";
import { ClimbingCard } from "../components/ClimbingCard";

export function ClimbEntry() {
  const [climbs, setClimbs] = useState([]);
  const [climb, setClimb] = useState({
    name: "",
    grade: ["", ""],
    rating: "",
    locationName: "",
  });
  const { name, grade, rating, locationName: location_name } = climb;
  const [crags, setCrags] = useState([]);

  //use effect stuff
  useEffect(() => {
    fetchClimbs();
    fetchCrags();
  }, []);

  //fetching climbs normal things
  async function fetchClimbs() {
    const { data } = await supabase.from("climbs").select();
    setClimbs(data);
    //console.log("data: ", data) //saving incase i need this
  }

  async function createClimb() {
    await supabase
      .from("climbs")
      .insert([
        {
          name,
          grade: "V" + climb.grade.join(""),
          rating,
          location_name,
          sent: "N",
        },
      ])
      .single();
    setClimb({ name: "", grade: ["", ""], rating: "", locationName: "" });
    fetchClimbs();
  }

  async function fetchCrags() {
    const { data } = await supabase.from("crags").select();
    setCrags(data);
  }

  function handleDelete(id) {
    setClimbs((climbs) => climbs.filter((climb) => climb.id !== id));
  }

  return (
    <div className="main max-w-[550px] mx-auto w-full mt-5">
      <div className="ClimbEntry mb-5">
        <div className="mb-5 w-full px-3">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Climb Entry
          </h1>
        </div>

        <div className="mb-5 w-full px-3">
          <label className="mb-3 block font-bold text-base text-[#482673]">
            Climb Name
          </label>
          <input
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#482673] focus:shadow-md"
            placeholder="Climb Name"
            value={name}
            onChange={(e) => setClimb({ ...climb, name: e.target.value })}
          />
        </div>

        <div className="w-full px-3">
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="font-bold mb-3 block text-base text-[#482673]">
                  Grade
                </label>
                <select
                  onChange={(e) => {
                    setClimb({
                      ...climb,
                      grade: [
                        e.target.value,
                        grade[1] !== "" && grade[1][0] === "/"
                          ? "/" + (+e.target.value + 1)
                          : grade[1],
                      ],
                    });
                  }}
                  value={climb.grade[0]}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#482673] focus:shadow-md"
                >
                  <option value="" disabled hidden>
                    Select Grade
                  </option>
                  {
                    [...Array(18).keys()].map((arr) => (
                      <option key={arr} value={arr}>
                        V{arr}
                      </option>
                    ))
                    //fancy way of making an array from 0-17
                  }
                </select>
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label className="mb-3 font-bold block text-base text-[#482673]">
                  Modifier
                </label>
                <select
                  onChange={(e) => {
                    setClimb({ ...climb, grade: [grade[0], e.target.value] });
                  }}
                  disabled={climb.grade[0] === ""}
                  value={climb.grade[1]}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#482673] focus:shadow-md"
                >
                  <option value=""></option>
                  <option value="-">-</option>
                  <option value="+">+</option>
                  <option value={"/" + (parseInt(climb.grade[0]) + 1)}>
                    {"/" + (parseInt(climb.grade[0]) + 1)}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* rating system guy */}
          <div className="mb-5 w-full px-3">
            <label className="mb-3 font-bold block text-base text-[#482673]">
              Rating
            </label>
            <input
              type="number"
              min="1"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#482673] focus:shadow-md"
              placeholder="Rating"
              value={rating}
              onChange={(e) => setClimb({ ...climb, rating: e.target.value })}
            />
          </div>

          {/* location name stuff */}
          <div className="mb-5 w-full px-3">
            <label className="mb-3 font-bold block text-base text-[#482673]">
              Location Name
            </label>
            <div className="select">
              <select
                onChange={(e) =>
                  setClimb({ ...climb, locationName: e.target.value })
                }
                value={climb.locationName}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#482673] focus:shadow-md"
              >
                <option value="" disabled hidden>
                  Select Location
                </option>
                {crags.map((crag) => (
                  <option key={crag.id} value={crag.name}>
                    {crag.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={createClimb}
            className="bg-transparent hover:bg-[#482673] text-[#482673] font-bold hover:text-white py-2 px-4 border border-[#482673] hover:border-transparent rounded"
            disabled={climb.locationName === "" || climb.grade[0] === ""}
          >
            Create Climb
          </button>
        </div>
      </div>

      <div className="px-3">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">
          List of Climbs
        </h1>
        {climbs.map((climb) => (
          <div key={climb.id} className="mb-2">
            <ClimbingCard
              key={climb.id}
              climb={climb}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
