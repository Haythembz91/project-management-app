import React from "react";
import FetchWithAuth from "@/utils/FetchWithAuth";
import {MdDelete} from 'react-icons/md'
const DeleteTaskModal = ({projectId,taskId}:{projectId:string,taskId:string})=>{


    const [isDeleting,setIsDeleting] = React.useState<boolean>(false)
    
    const handleDelete= async()=>{
        setIsDeleting(true)
        try{
                const response = await FetchWithAuth("/api/tasks/delete",{
                method:'DELETE',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({taskId:taskId as string,
                    projectId:projectId as string,
                })
            })
            if(response.status===200){
                const data = await response.json()
                window.location.href = `/projects/${projectId}`
            }
        }catch(error){
            console.error(error)
        }finally{
            setIsDeleting(false)
        }
    }

    return(
        <div>
            <button data-bs-toggle="modal" data-bs-target="#exampleModal" className={'btn bg-danger text-white'}><MdDelete /> Delete Task</button>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Delete</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this task?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                        {!isDeleting? <button className={'btn bg-danger text-white'} onClick={handleDelete}>Delete task</button> :
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


export default DeleteTaskModal