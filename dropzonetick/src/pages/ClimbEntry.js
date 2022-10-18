import { useState, useEffect } from "react";
import { supabase } from "../client";
import { ClimbingCard } from "../functions/ClimbingCard";

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
    <div className="ClimbEntry mx-auto w-full max-w-[550px]">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Climb Entry
      </h1>

      <div className="mb-5 w-full px-3">
        <label className="mb-3 block text-base font-medium text-[#07074D]">
          Climb Name
        </label>
        <input
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          placeholder="Climb Name"
          value={name}
          onChange={(e) => setClimb({ ...climb, name: e.target.value })}
        />
      </div>

      <div className="mb-5 w-full px-3 ">
        <label className="mb-3 block text-base font-medium text-[#07074D]">
          Grade
        </label>

        <div className="-mx-3 flex flex-wrap">
          {/* get grade guy guy */}
          <div className="px-3 sm:w-1/3">
            {/* first part of grade */}

            <div className="select">
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
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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

            {/* awesome grade modifier selecter  */}
            <div className="px-3 sm:w-1/2">
              <select
                onChange={(e) => {
                  setClimb({ ...climb, grade: [grade[0], e.target.value] });
                }}
                disabled={climb.grade[0] === ""}
                value={climb.grade[1]}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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

      {/* rating system guy */}
      <div className="mb-5 w-full px-3">
        <label className="mb-3 block text-base font-medium text-[#07074D]">
          Rating
        </label>
        <input
          type="number"
          min="1"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setClimb({ ...climb, rating: e.target.value })}
        />
      </div>

      {/* location name stuff */}
      <div className="mb-5 w-full px-3">
        <label className="mb-3 block text-base font-medium text-[#07074D]">
          Location Name
        </label>
        <div className="select">
          <select
            onChange={(e) =>
              setClimb({ ...climb, locationName: e.target.value })
            }
            value={climb.locationName}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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

      <div>
        <button
          onClick={createClimb}
          className="py-2 px-4 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
          disabled={climb.locationName === "" || climb.grade[0] === ""}
        >
          Create Climb
        </button>
      </div>

      <div>
        <h1 className="title">List of Climbs</h1>
        {climbs.map((climb) => (
          <div key={climb.id}>
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
