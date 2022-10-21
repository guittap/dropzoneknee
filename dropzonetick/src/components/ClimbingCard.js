import { supabase } from "../client";
import { RiDeleteBin7Fill } from "react-icons/ri";

export const ClimbingCard = ({ climb, onDelete }) => {
  async function deleteClimb() {
    const { error } = await supabase.from("climbs").delete().eq("id", climb.id);

    onDelete(climb.id);
    console.log(error);
  }

  return (
    <div className="climbingCard flex">
      <div key={climb.id}>
        <span className="font-bold mr-2 align-center">
          {climb.name} {climb.grade}
        </span>
        <span className="mr-2 text-yellow align-center">
          {"★".repeat(climb.rating)}
        </span>
        <button
          className="text-gray font-semibold hover:text-red align-center"
          onClick={deleteClimb}
        >
          <RiDeleteBin7Fill />
        </button>
      </div>
    </div>
  );
};
