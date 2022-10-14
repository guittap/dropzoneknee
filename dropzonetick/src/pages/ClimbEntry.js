import {useState, useEffect} from 'react'
import {supabase} from '../client'

export function ClimbEntry() {
  const [climbs, setClimbs] = useState([])
  const [climb, setClimb] = useState({ name: "", grade: "", rating: "", location_name: ""})
  const {name, grade, rating, location_name} = climb
  const [crags, setCrags] = useState([])

  useEffect(() => {
    fetchClimbs()
    fetchCrags()
  }, [])

  async function fetchClimbs() {
    const { data } = await supabase 
      .from('climbs')
      .select()
    setClimbs(data)
    console.log("data: ", data)
  }

  async function createClimb() {
    await supabase
      .from('climbs')
      .insert([
        {name, grade, rating, location_name}
      ])
      .single()
      setClimb({ name: "", grade: "", rating: "", location_name: ""})
      fetchClimbs()
  }

  async function fetchCrags() {
    const { data } = await supabase 
      .from('crags')
      .select()
    setCrags(data)
    console.log("data: ", data)
  }

  return (
    <div className="ClimbEntry container is-max-desktop">
      <h1 className='title'>Climb Entry</h1>

      <div className='field'>
        <label className="label">Climb Name</label>
        <input
          className="input"
          placeholder="Climb Name"
          value={name}
          onChange={e => setClimb({ ...climb, name: e.target.value})}
        />
      </div>
      
      <div className='field'>
        <label className="label">Grade</label>
        <input
          className="input"
          placeholder="Grade"
          value={grade}
          onChange={e => setClimb({ ...climb, grade: e.target.value})}
        />
        <div class="select">
          <select 
            placeholder='Select Location'
            onChange={e => setClimb({ ...climb, location_name: e.target.value})}
          >

          </select>
        </div>
      </div>
      
      <div className='field'>
      <label className="label">Rating</label>
        <input
          className="input"
          placeholder="Rating"
          value={rating}
          onChange={e => setClimb({ ...climb, rating: e.target.value})}
        />
      </div>
      
      <div className='field'>
        <label className="label">Location Name</label>
        <div class="select">
          <select 
            placeholder='Select Location'
            onChange={e => setClimb({ ...climb, location_name: e.target.value})}
          >
            <option value="">Select Location</option>
            {
              crags.map(crag => (
                <option value={crag.name}>{crag.name}</option>
              ))
            }
          </select>
        </div>
      </div>
      
      <button onClick={createClimb} className="button is-primary" disabled={climb.location_name===""}>Create Climb</button>
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