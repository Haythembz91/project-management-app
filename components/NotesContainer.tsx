import {Note} from "@/libs/interfaces";
import { FaUser } from "react-icons/fa";
const NotesContainer = ({notes}:{notes:Note[]|null})=>{

    if(!notes) return null

    console.log(notes)
    return(
        <div>
            {notes.map(note=>(<div className={'d-flex'} key={note.id}>
                <div className={'border-bottom'}>
                    <div className={'d-flex'}>
                        <p><FaUser/> {note.username}</p>
                        <p className={'text-secondary px-1'}>{'(' + note.email + ')' + ' - ' + new Date(note.created_at).toLocaleString()}</p>
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