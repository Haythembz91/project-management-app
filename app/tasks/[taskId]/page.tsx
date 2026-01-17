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
                <Link href={'/projects/' + task.project_id}>
                    <IoArrowBackOutline /> Back to project page
                </Link>
            </div>
            <div className={'d-flex justify-content-between mb-3'}>
                <div>
                    <h1 className={'mb-3'}>Project: {task.project_name}</h1>
                    <h2>Task: {task.name}</h2>
                </div>
                <div>
                    <Link className={'btn btn-outline-dark'} href={'/tasks/'+taskId+'/edit'}>Edit task</Link>
                </div>
            </div>
            <div className={'row row-cols-1 row-cols-md-2 mb-3'}>
                <p className={'col'}>Description: {task.description}</p>
                <p className={'col'}>Priority: {priorityIcon(task.priority)} {task.priority}</p>
                <div className={'col'}>
                    <p>Status: <span className={'badge'+' '+statusColor(task.status as status)}>{task.status}</span></p>
                </div>
                <p className={'col'}>Assigned to: {task.assigned_to}</p>
                <p className={'col'}>Start date: {new Date(task.task_start_date).toLocaleDateString()}</p>
                <p className={'col'}>Due date: {new Date(task.task_due_date).toLocaleDateString()}</p>
                <div className={'col'}>
                    <p className="card-subtitle">Progress:</p>
                    <div style={{height:'12px'}} className={'border border-1 rounded-3 overflow-hidden bg-light my-1'}>
                        <p className={'m-0 py-2'} style={{backgroundImage:'linear-gradient(135deg,rgb(255,56,92) 20%,rgb(189,30,89))',width:`${task.progress}%`}}></p>
                    </div>
                    <p className={'my-0'}>{Math.round(task.progress)}% complete</p>
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
                        {!isLoading?<button className={'btn btn-outline-dark col-12'} type={'submit'}>Post</button>:
                            <button className="btn btn-outline-dark w-100" type="button" disabled>
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