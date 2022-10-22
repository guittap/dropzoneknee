import { useState, useEffect } from "react";
import { supabase } from "../client";
import { CragCard } from "../components/CragCard";
import { Input, Button, Label } from "../components/Styles";

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
          <h1 className="text-2xl font-bold tracking-tight">Crag Entry</h1>
        </div>

        <div className="mb-5 w-full px-3">
          <Label>Crag Name</Label>
          <Input
            placeholder="Crag Name"
            value={name}
            onChange={(e) => setCrag({ ...crag, name: e.target.value })}
          />
        </div>

        <div className="mb-5 w-full px-3">
          <Label>Location Name</Label>
          <Input
            placeholder="State, Country, etc."
            value={location}
            onChange={(e) => setCrag({ ...crag, location: e.target.value })}
          />
        </div>

        <div className="mb-5 w-full px-3 text-center">
          <Button onClick={createCrag}>Create Crag</Button>
        </div>
      </div>

      <div className="Crags">
        <div className="mb-5 w-full px-3">
          <h1 className="text-2xl font-bold tracking-tight">List of Crags</h1>
        </div>

        <div className="mb-5 w-full px-3">
          {crags.map((crag) => (
            <div key={crag.id}>
              <CragCard key={crag.id} crag={crag} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
