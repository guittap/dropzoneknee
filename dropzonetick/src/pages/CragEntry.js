import { useState, useEffect } from "react";
import { supabase } from "../client";

export function CragEntry() {
  const [crags, setCrags] = useState([]);
  const [crag, setCrag] = useState({ name: "", location: "" });
  const { name, location } = crag;

  useEffect(() => {
    fetchCrags();
  }, []);

  async function fetchCrags() {
    const { data } = await supabase.from("crags").select();
    setCrags(data);
    console.log("data: ", data);
  }

  async function createCrag() {
    await supabase.from("crags").insert([{ name, location }]).single();
    setCrag({ name: "", location: "" });
    fetchCrags();
  }

  return (
    <div className="CragEntry max-w-[550px] mx-auto w-full mt-5">
      <div>
        <div className="mb-5 w-full px-3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Crag Entry
          </h1>
        </div>

        <div className="mb-5 w-full px-3">
          <label className="mb-3 block font-bold text-base ">Crag Name</label>
          <input
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#482673] focus:shadow-md"
            placeholder="Crag Name"
            value={name}
            onChange={(e) => setCrag({ ...crag, name: e.target.value })}
          />
        </div>

        <div className="mb-5 w-full px-3">
          <label className="mb-3 block font-bold text-base ">
            Location Name
          </label>
          <input
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#482673] focus:shadow-md"
            placeholder="State, Country, etc."
            value={location}
            onChange={(e) => setCrag({ ...crag, location: e.target.value })}
          />
        </div>

        <div className="mb-5 w-full px-3 text-center">
          <button
            onClick={createCrag}
            className="bg-transparent hover:bg-[#482673] text-[#482673] font-bold hover:text-white py-2 px-4 border border-[#482673] hover:border-transparent rounded"
          >
            Create Crag
          </button>
        </div>
      </div>

      <div className="Crags">
        <div className="mb-5 w-full px-3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            List of Crags
          </h1>
        </div>

        <div className="mb-5 w-full px-3">
          {crags.map((crag) => (
            <div key={crag.id}>
              <h3 className="font-bold">
                {crag.name}, {crag.location}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
