import { useEffect, useState } from "react";
import {supabase} from '../client'

export function Climbs() {
    const [cragID] = window.location.href.split('/').slice(-2)
    const [crags, setCrags] = useState()

    useEffect(() => {
        fetchCrags()
    
      }, )
    
      async function fetchCrags() {
        const { data } = await supabase 
          .from('crags')
          .select()
        setCrags(data.find(obj => {return obj.id === +cragID;}).name)
        console.log("data: ", data)
      }

      console.log(crags)


    return(
        <div className="Climbs">
            <h3>{crags}</h3>

        </div>

    );
}