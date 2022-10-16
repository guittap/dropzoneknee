import {supabase} from '../client'

export const ClimbingCard = ({ climb }) => {
    async function deleteClimb() {
        const { error } = await supabase
          .from('climbs')
          .delete()
          .eq('id', climb.id)
          console.log(error)
      }

    return (
        <div className='climbingCard'>
            <div key={climb.id}>
                <span>{climb.name} {climb.grade} {"★".repeat(climb.rating)}</span>
                <button className='delete' onClick={deleteClimb}></button>
            </div>
        </div>
    )
}