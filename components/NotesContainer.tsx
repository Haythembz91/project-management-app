import {Note} from "@/libs/interfaces";
import { FaUser } from "react-icons/fa";
const NotesContainer = ({notes}:{notes:Note[]|null})=>{

    if(!notes) return null

    const postTime = (time:string)=>{
        const diff = Date.now() - new Date(time).getTime()
        if(diff<60000){
            return 'Just now'
        }else if(diff<120000){
            return '1 minute ago'
        }else if(diff<3600000){
            return Math.floor(diff/60000) + ' minutes ago'
        } else if(diff<7200000){
            return "1 hour ago"
        }else if(diff<86400000){
            return Math.floor(diff/3600000) + ' hours ago'
        }else if(diff<86400000*2){
            return '1 day ago'
        }else if(diff<604800000){
            return Math.floor(diff/86400000) + ' days ago'
        }else return new Date(time).toLocaleString()
    }

    const sortedNotes = notes.sort((a,b)=>new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

    return(
        <div>
            {sortedNotes.map(note=>(<div className={'d-flex'} key={note.id}>
                <div className={'border-bottom'}>
                    <div className={'d-md-flex'}>
                        <p className={'my-0'}><FaUser/><span className={'px-2'}>{note.username}</span></p>
                        <p className={'text-secondary ps-3 ps-md-0 fst-italic'}>{'(' + note.email + ')' + ' - ' + postTime(note.created_at)}</p>
                    </div>
                    <div>
                        <p className={'px-3'}>{note.text}</p>
                    </div>
                </div>
            </div>))}
        </div>
    )
}

export default NotesContainer