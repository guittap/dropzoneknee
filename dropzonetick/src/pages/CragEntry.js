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
    <div className="CragEntry container is-max-desktop">
      <h1 className='title'>Crag Entry</h1>

      <div className="field">
        <label className="label">Crag Name</label>
        <input
          className="input"
          placeholder="Crag Name"
          value={name}
          onChange={e => setCrag({ ...crag, name: e.target.value})}
        />
      </div>

      <div className="field">
        <label className="label">Location Name</label>
        <input
          className="input"
          placeholder="State, Country, etc."
          value={location}
          onChange={e => setCrag({ ...crag, location: e.target.value})}
        />
      </div>
        <button onClick={createCrag} className="button is-primary">Create Crag</button>
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