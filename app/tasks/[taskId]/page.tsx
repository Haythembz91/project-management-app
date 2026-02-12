'use client'
import FetchWithAuth from "@/utils/FetchWithAuth";
import React, {useEffect} from "react";
import {useParams} from "next/navigation";
import {Note, Tasks} from "@/libs/interfaces";
import {IoArrowBackOutline} from "react-icons/io5";
import Link from "next/link";
import {priorityIcon} from "@/utils/PriorityIcon";
import {statusColor} from "@/utils/StatusColor";
import {status} from "@/libs/enums";
import NotesContainer from "@/components/NotesContainer";
import getTask from "@/utils/GetTask";
import DeleteTaskModal from "@/components/DeleteTaskModal";
import { FiEdit } from "react-icons/fi";

const Home = ()=>{

    const {taskId} = useParams()
    const [task,setTask] = React.useState<Tasks|null>(null)
    const [notes,setNotes] = React.useState<Note[]|null>(null)
    const [error,setError] = React.useState<string>('')
    const [isLoading,setIsLoading] = React.useState<boolean>(false)
    const formRef = React.useRef<HTMLFormElement>(null)


    const handlePost = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setError('')
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        formData.append('task_id',taskId as string)
        if (!formData.get('text')) {
            setError('Text is required')
            setIsLoading(false)
            return
        }
        try{
            const response = await FetchWithAuth('/api/notes/task',{
                method:'POST',
                body:formData
            })
            if(!response.ok){
                if(response.status===401){
                    window.location.href = '/auth/login'
                    return
                }
                const data = await response.json()
                setError(data.error)
                return
            }
            setError('')
            await getTask(taskId as string).then(p=> {
                setNotes(p.notes);
                setTask(p.task)
            })
            formRef.current?.reset()
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>)=>{
        
        const file = e.target.files
        if(!file){
            return
        }
        const formData = new FormData()
        Array.from(file).forEach(f=>formData.append('file',f))
        formData.append('task_id',taskId as string)
        try{
            const response = await FetchWithAuth('/api/media/upload',{
                method:'POST',
                body:formData
            })
            if(!response.ok){
                if(response.status===401){
                    window.location.href = '/auth/login'
                    return
                }
                const data = await response.json()
                console.log(data.error)
                return
            }
            const data = await response.json()
            console.log(data.message)
        }catch(e){
            console.log(e)
        }
    }


    useEffect(()=>{
        const fetchTask = async()=>{
            const result = await getTask(taskId as string)
            setTask(result.task)
            setNotes(result.notes)
        }
        fetchTask().then().catch()
    },[])

    if(!task){
        return (
            <div className={'d-flex justify-content-center my-5'}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <section className={'container-fluid'}>
            <div className={'mb-3'}>
                <Link className="link-dark fst-italic link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href={'/projects/' + task.project_id}>
                    <IoArrowBackOutline /> Back to project page
                </Link>
                <div className="d-flex justify-content-end">
                    <div className="px-1">
                        <Link className={'btn fs-2 p-1'} href={'/tasks/'+taskId+'/edit'}><span><FiEdit /></span></Link>
                    </div>
                    <DeleteTaskModal projectId={task.project_id as string} taskId={taskId as string} ></DeleteTaskModal>
                </div>
            </div>
            <div className={'d-flex justify-content-between mb-3'}>
                <div>
                    <h1 className={'mb-3'}>Project: {task.project_name}</h1>
                    <h2>Task: {task.name}</h2>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-4 mb-3">
                <div className="col">
                    <div className="text-muted small">Description</div>
                    <div className="fw-semibold">{task.description}</div>
                </div>

                <div className="col">
                    <div className="text-muted small">Priority</div>
                    <div className="fw-semibold d-flex align-items-center gap-2">
                    {priorityIcon(task.priority)}
                    {task.priority}
                    </div>
                </div>

                <div className="col">
                    <div className="text-muted small">Status</div>
                    <span className={`badge ${statusColor(task.status as status)}`}>
                    {task.status}
                    </span>
                </div>

                <div className="col">
                    <div className="text-muted small">Assigned to</div>
                    <div className="fw-semibold">{task.assigned_to}</div>
                </div>

                <div className="col">
                    <div className="text-muted small">Start date</div>
                    <div className="fw-semibold">
                    {new Date(task.task_start_date).toLocaleDateString()}
                    </div>
                </div>

                <div className="col">
                    <div className="text-muted small">Due date</div>
                    <div className="fw-semibold">
                    {new Date(task.task_due_date).toLocaleDateString()}
                    </div>
                </div>

                <div className="col">
                    <div className="text-muted small mb-1">Progress</div>

                    <div
                    style={{ height: '12px' }}
                    className="border border-1 rounded-3 overflow-hidden bg-light"
                    >
                    <div
                        style={{
                        width: `${task.progress}%`,
                        height: '100%',
                        backgroundImage:
                            'linear-gradient(135deg,rgb(255,56,92) 20%,rgb(189,30,89))',
                        }}
                    />
                    </div>

                    <div className="text-muted small mt-1 fst-italic">
                    {Math.round(task.progress)}% completed
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label"></label>
                            <input className="form-control" type="file" id="formFile" onChange={handleUpload} multiple></input>
                        </div>
                    </form>
                </div>
            </div>

            <div className={'my-3'}>
                <h3 className={'mb-3'}>Notes:</h3>
                <NotesContainer notes={notes}></NotesContainer>
                <div>
                    <form onSubmit={handlePost} ref={formRef} className="mb-3 col-md-5">
                        <div className={'mb-3'}>
                            <label htmlFor="note" className="form-label">Add note:</label>
                            <textarea name={'text'} className="form-control" id="note" rows={3}></textarea>
                        </div>
                        {error&&<div className="alert alert-danger mb-3" role="alert">
                            {error}
                        </div>}
                        {!isLoading?<button className={'gradBtn col-12'} type={'submit'}>Post</button>:
                            <button className="gradBtn opacity-50 w-100" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span className={'px-1'} role="status">Posting...</span>
                            </button>}
                    </form>
                </div>
            </div>
            <div className={'mb-3'}>
                <p>Last updated: {new Date(task.updated_at).toLocaleString()}</p>
            </div>
        </section>
    )
}

export default Home