import React from "react";
import FetchWithAuth from "@/utils/FetchWithAuth";
import {MdDelete} from 'react-icons/md'
const Modal = ({projectId}:{projectId:string})=>{


    const [isDeleting,setIsDeleting] = React.useState<boolean>(false)
    
    const handleDelete= async()=>{
        setIsDeleting(true)
        try{
                const response = await FetchWithAuth("/api/projects/delete",{
                method:'DELETE',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({projectId:projectId as string})
            })
            if(response.status===200){
                const data = await response.json()
                window.location.href = '/projects'
            }
        }catch(error){
            console.error(error)
        }finally{
            setIsDeleting(false)
        }
    }

    return(
        <div>
            <button data-bs-toggle="modal" data-bs-target="#exampleModal" className={'btn text-danger fs-2 p-1'}><MdDelete /></button>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Delete</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this project?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                        {!isDeleting? <button className={'btn bg-danger text-white'} onClick={handleDelete}>Delete project</button> :
                            <button className="btn bg-danger text-white" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span className={'px-1'} role="status">Deleting...</span>
                            </button>
                        }
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}


export default Modal