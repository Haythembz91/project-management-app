import {Note} from "@/libs/interfaces";
import { FaUser } from "react-icons/fa";
const NotesContainer = ({notes}:{notes:Note[]|null})=>{

    if(!notes) return null

    console.log(notes)
    return(
        <div>
            {notes.map(note=>(<div className={'d-flex'} key={note.id}>
                <div className={'border-bottom'}>
                    <div className={'d-md-flex'}>
                        <p className={'my-0'}><FaUser/><span className={'px-2'}>{note.username}</span></p>
                        <p className={'text-secondary ps-3 ps-md-0'}>{'(' + note.email + ')' + ' - ' + new Date(note.created_at).toLocaleString()}</p>
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