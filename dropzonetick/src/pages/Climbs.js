import { useEffect, useState } from "react";
import {supabase} from '../client'

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
        console.log("data: ", data)
      }

      async function fetchClimbs() {
        const { data } = await supabase 
          .from('climbs')
          .select()
        setClimbs(data)
        console.log("data: ", data)
      }

    return(
        <div className="Climbs">
            <h3>{crag}</h3>
            {
                climbs.map(climb => (
                <div key={climb.id}>
                    <h3>{climb.name} {climb.grade} {"⭐".repeat(climb.rating)}</h3>
                </div>
                ))
            }
        </div>

    );
}