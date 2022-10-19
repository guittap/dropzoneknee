import { useState, useEffect } from "react";
import { supabase } from "../client";
import { CragCard } from "../components/CragCard";

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

  function handleDelete(id) {
    setCrags((crags) => crags.filter((crag) => crag.id !== id));
  }

  return (
    <div className="CragEntry max-w-[550px] mx-auto w-full mt-5">
      <div>
        <div className="mb-5 w-full px-3">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            List of Crags
          </h1>
        </div>

        <div className="mb-5 w-full px-3">
          {crags.map((crag) => (
            <div key={crag.id}>
              <h3 className="font-bold mb-2">
                <CragCard key={crag.id} crag={crag} onDelete={handleDelete} />
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
