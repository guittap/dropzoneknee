import {Link} from "react-router-dom"
import {supabase} from '../client'
import {useState, useEffect} from 'react'

export function Admin() {
    const [crags, setCrags] = useState([])

    useEffect(() => {
        fetchCrags()
    
      }, [])
    
      async function fetchCrags() {
        const { data } = await supabase 
          .from('crags')
          .select()
        setCrags(data)
        console.log("data: ", data)
      }

    return(
        <div className="Admin">
            {
                crags.map(crag => (
                <div key={crag.id}>
                    <Link to={`/admin/${crag.id}/${crag.name.replace(/\s/g, '-').toLowerCase()}`}><h3>{crag.name}, {crag.location}</h3></Link>
                </div>
                ))
            }

            <Link to="/admin/cragentry">Enter New Crag</Link><br/>
            <Link to="/admin/climbentry">Enter New Climb</Link>
        </div>
    )
}