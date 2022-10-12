import {useState, useEffect} from 'react'
import {supabase} from '../client'

export function CragEntry() {
  const [crags, setCrags] = useState([])
  const [crag, setCrag] = useState({ name: "", location: ""})
  const {name, location} = crag

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

  async function createCrag() {
    await supabase
      .from('crags')
      .insert([
        {name, location}
      ])
      .single()
      setCrag({ name: "", location: ""})
      fetchCrags()
  }

  return (
    <div className="CragEntry">
      <input
        placeholder="Crag Name"
        value={name}
        onChange={e => setCrag({ ...crag, name: e.target.value})}
      />
      <input
        placeholder="State, Country, etc."
        value={location}
        onChange={e => setCrag({ ...crag, location: e.target.value})}
      />
      <button onClick={createCrag}>Create Crag</button>
      {
        crags.map(crag => (
          <div key={crag.id}>
            <h3>{crag.name}, {crag.location}</h3>
          </div>
        ))
      }

    </div>
  );
}