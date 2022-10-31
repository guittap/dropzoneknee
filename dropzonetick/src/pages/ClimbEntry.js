import { useState, useEffect } from "react";
import { supabase } from "../client";
import { AddButton } from "../components/AddButton";
import { ClimbingCard } from "../components/ClimbEdit";
import { Navbar } from "../components/Navbar";
import { Select, Input, Button, Label } from "../components/Styles";

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
    //console.log("data: ", data); //saving incase i need this
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
    <div className="mx-auto w-full">
      <Navbar />
      <div className="max-w-[550px] mt-14 mx-auto w-full">
        <div className="ClimbEntry mb-5">
          <div className="mb-5 w-full px-3">
            <h1 className="text-2xl font-bold tracking-tight">Climb Entry</h1>
          </div>

          <div className="mb-5 w-full px-3">
            <Label>Climb Name</Label>
            <Input
              placeholder="Climb Name"
              value={name}
              onChange={(e) => setClimb({ ...climb, name: e.target.value })}
            />
          </div>

          <div className="w-full px-3">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <Label>Grade</Label>
                  <Select
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
                  >
                    <option value="" disabled hidden>
                      Select Grade
                    </option>
                    {[...Array(18).keys()].map((data) => (
                      <option key={data} value={data}>
                        {"V" + data}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <Label>Modifier</Label>
                  <Select
                    onChange={(e) => {
                      setClimb({ ...climb, grade: [grade[0], e.target.value] });
                    }}
                    value={climb.grade[1]}
                    data={["", "-", "+", "/" + (parseInt(climb.grade[0]) + 1)]}
                    disabled={climb.grade[0] === ""}
                  >
                    {["", "-", "+", "/" + (parseInt(climb.grade[0]) + 1)].map(
                      (data) => (
                        <option key={data} value={data}>
                          {data}
                        </option>
                      )
                    )}
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* rating system guy */}
            <div className="mb-5 w-full px-3">
              <Label>Rating</Label>
              <Input
                type="number"
                min="1"
                max="5"
                placeholder="Rating"
                value={rating}
                onChange={(e) => setClimb({ ...climb, rating: e.target.value })}
              />
            </div>

            {/* location name stuff */}
            <div className="mb-5 w-full px-3">
              <Label>Location Name</Label>
              <div className="select">
                <Select
                  onChange={(e) =>
                    setClimb({ ...climb, locationName: e.target.value })
                  }
                  value={climb.locationName}
                >
                  <option value="" disabled hidden>
                    Select Location
                  </option>
                  {crags.map((crag) => (
                    <option key={crag.id} value={crag.name}>
                      {crag.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={createClimb}
              disabled={climb.locationName === "" || climb.grade[0] === ""}
            >
              Create Climb
            </Button>
          </div>
        </div>

        <div className="px-3 mb-5">
          <h1 className="text-2xl font-bold tracking-tight mb-5">
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
      <AddButton />
    </div>
  );
}
