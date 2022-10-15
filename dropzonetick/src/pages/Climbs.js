import { useEffect, useState } from "react";
import {supabase} from '../client'
import {Link} from "react-router-dom"

export function Climbs() {
    const [cragID] = window.location.href.split('/').slice(-2)
    const [crag, setCrag] = useState()
    const [climbs, setClimbs] = useState([])

    useEffect(() => {
        fetchCrag()
        fetchClimbs()
    
      }, )
    
      async function fetchCrag() {
        const { data } = await supabase 
          .from('crags')
          .select()
        setCrag(data.find(obj => {return obj.id === +cragID;}).name) 
        //finds the name of the crag
        //you know after some thinking i realized I could've just used the URL to get the crag name
        //console.log("data: ", data)
      }

      async function fetchClimbs() {
        const { data } = await supabase 
          .from('climbs')
          .select()
          .eq('location_name', crag)
        setClimbs(data)
        //console.log("data: ", data)
      }

    return(
        <div className="Climbs">
            <h1 className="title">{crag}</h1>
            {
                climbs.map(climb => (
                <div key={climb.id}>
                    <h3>{climb.name} {climb.grade} {"⭐".repeat(climb.rating)}</h3>
                </div>
                ))
            }
            <Link to="/admin/climbentry">Enter New Climb</Link>
        </div>
    );
}