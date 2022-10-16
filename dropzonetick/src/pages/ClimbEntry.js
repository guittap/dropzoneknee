import {useState, useEffect} from 'react'
import {supabase} from '../client'
import {ClimbingCard} from '../components/ClimbingCard'

export function ClimbEntry() {
  const [climbs, setClimbs] = useState([])
  const [climb, setClimb] = useState({ name: "", grade: ["", ""], rating: "", locationName: ""})
  const {name, grade, rating, locationName: location_name} = climb
  const [crags, setCrags] = useState([])

  //use effect stuff
  useEffect(() => {
    fetchClimbs()
    fetchCrags()
  }, [])

  //fetching climbs normal things
  async function fetchClimbs() {
    const { data } = await supabase 
      .from('climbs')
      .select()
    setClimbs(data)
    //console.log("data: ", data) //saving incase i need this
  }

  async function createClimb() {
    await supabase
      .from('climbs')
      .insert([
        {name, grade: "V"+climb.grade.join(""), rating, location_name}
      ])
      .single()
      setClimb({ name: "", grade: ["", ""], rating: "", locationName: ""})
      fetchClimbs()
  }

  async function fetchCrags() {
    const { data } = await supabase 
      .from('crags')
      .select()
    setCrags(data)
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
      
      {/* get grade guy guy */}
      <div className='field'>

        {/* first part of grade */}
        <label className="label">Grade</label>
        <div className="select">
          <select 
              onChange={e => {
                setClimb({ ...climb ,
                  grade: [e.target.value, grade[1]!==""&&grade[1][0]==='/' ? '/'+(+e.target.value+1) : grade[1]]
                });
              }}
              value={climb.grade[0]}
          >
            <option value="">Select Grade</option>
            {
              [...Array(18).keys()].map( arr => (
                <option key={arr} value={arr}>V{arr}</option>
              ))
              //fancy way of making an array from 0-17
            }
          </select>
        </div>

        {/* awesome grade modifier selecter  */}
        <div className="select">
          <select 
            onChange={e => {
              setClimb({ ...climb ,
                grade: [grade[0], e.target.value]
              })}
            }
            disabled={climb.grade[0]===""}
            value={climb.grade[1]}
          >
            <option value=""></option>
            <option value="-">-</option>
            <option value="+">+</option>
            <option value={"/"+(parseInt(climb.grade[0])+1)}>{"/"+(parseInt(climb.grade[0])+1)}</option>
          </select>
        </div>
      </div>
      
      {/* rating system guy */}
      <div className='field'>
      <label className="label">Rating</label>
        <input
          className="input"
          placeholder="Rating"
          value={rating}
          onChange={e => setClimb({ ...climb, rating: e.target.value})}
        />
      </div>
      
      {/* location name stuff */}
      <div className='field'>
        <label className="label">Location Name</label>
        <div className="select">
          <select 
            onChange={e => setClimb({ ...climb, locationName: e.target.value})}
            value={climb.locationName}
          >
            <option value="">Select Location</option>
            {
              crags.map(crag => (
                <option key={crag.id} value={crag.name}>{crag.name}</option>
              ))
            }
          </select>
        </div>
      </div>
      
      <button onClick={createClimb} className="button is-primary" disabled={climb.locationName===""||climb.grade[0]===""}>Create Climb</button>
      
      <h1 className='title'>List of Climbs</h1>
      {
        climbs.map(climb => (
          <div key={climb.id}>
            <ClimbingCard
              key={climb.id}
              climb={climb}
            />
          </div>
        ))
      }

    </div>
  );
}