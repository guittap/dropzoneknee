import {useState, useEffect} from 'react'
import {supabase} from '../client'

export function ClimbEntry() {
  const [climbs, setClimbs] = useState([])
  const [climb, setClimb] = useState({ name: "", grade: "", rating: "", location_name: ""})
  const {name, grade, rating, location_name} = climb

  useEffect(() => {
    fetchClimbs()

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

  return (
    <div className="ClimbEntry">
      <input
        placeholder="Climb Name"
        value={name}
        onChange={e => setClimb({ ...climb, name: e.target.value})}
      />
      <input
        placeholder="Grade"
        value={grade}
        onChange={e => setClimb({ ...climb, grade: e.target.value})}
      />
      <input
        placeholder="Rating"
        value={rating}
        onChange={e => setClimb({ ...climb, rating: e.target.value})}
      />
      <input
        placeholder="Location Name"
        value={location_name}
        onChange={e => setClimb({ ...climb, location_name: e.target.value})}
      />
      <button onClick={createClimb}>Create Climb</button>
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