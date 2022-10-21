import { supabase } from "../client";
import { RiDeleteBin7Fill } from "react-icons/ri";

export const CragCard = ({ crag, onDelete }) => {
  async function deleteCrag() {
    const { error } = await supabase.from("crags").delete().eq("id", crag.id);

    onDelete(crag.id);
    deleteClimb();
    console.log(error);
  }

  async function deleteClimb() {
    const { error } = await supabase
      .from("climbs")
      .delete()
      .eq("location_name", crag.name);

    console.log(error);
  }

  return (
    <div className="CragCard flex">
      <div className="mr-2 align-center">
        <h3 className="font-bold mb-2">
          {crag.name}, {crag.location}
        </h3>
      </div>
      <div className="mr-2 align-center">
        <button
          className="text-gray font-semibold hover:text-red align-center"
          onClick={deleteCrag}
        >
          <RiDeleteBin7Fill />
        </button>
      </div>
    </div>
  );
};
