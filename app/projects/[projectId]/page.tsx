'use client'
import Link from "next/link";
import {IoMdAdd} from "react-icons/io";
import {useParams} from "next/navigation";
import React, {useEffect} from "react";
import GetProject from "@/utils/GetProject";
import { IoArrowBackOutline } from "react-icons/io5";
import {Note, Project, Tasks} from "@/libs/interfaces";
import TasksTableView from "@/components/TasksTableView";
import {MdTableRows, MdViewModule} from "react-icons/md";
import CardViewTasks from "@/components/CardViewTasks";
import {statusColor} from "@/utils/StatusColor";
import {status} from "@/libs/enums";
import NotesContainer from "@/components/NotesContainer";
import FetchWithAuth from "@/utils/FetchWithAuth";
import {FaChartGantt} from "react-icons/fa6";
import Modal from "@/components/Modal";
import { FiEdit } from "react-icons/fi";

const Home = ()=>{
    const {projectId} = useParams()
    const [project,setProject] = React.useState<Project|null>(null)
    const [tasks,setTasks] = React.useState<Tasks[]|null>(null)
    const [cardView,setCardView] = React.useState<boolean>(true)
    const [error,setError] = React.useState<string>('')
    const [isLoading,setIsLoading] = React.useState<boolean>(false)
    const [notes,setNotes] = React.useState<Note[]|null>(null)
    const formRef = React.useRef<HTMLFormElement>(null)
    const handlePost = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setError('')
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        formData.append('project_id',projectId as string)
        if (!formData.get('text')) {
            setError('Text is required')
            setIsLoading(false)
            return
        }
        try{
            const response = await FetchWithAuth('/api/notes/project',{
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
            const p = await GetProject({id:projectId as string})
            if(p){
                setProject(p.project)
                setTasks(p.tasks)
                setNotes(p.notes)
            }
            formRef.current?.reset()
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        const getProject = async ()=>{
            const p = await GetProject({id:projectId as string})
            if(p){
                setProject(p.project)
                setTasks(p.tasks)
                setNotes(p.notes)
            }
        }
        getProject().catch(console.error)
    },[projectId])
    if(!project){
        return (
            <div className={'d-flex justify-content-center my-5'}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className={'container-fluid'}>
            <div className={'mb-3'}>
                <Link className="link-dark fst-italic link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href={'/projects'}><IoArrowBackOutline /> Back to projects</Link>
                 
            </div>
            <div className="d-flex justify-content-end">
                <div className="px-1">
                    <Link className={'btn fs-2 p-1'} href={'/projects/'+projectId+'/edit'}><FiEdit></FiEdit></Link>
                </div>
                <Modal projectId={projectId as string}></Modal>
            </div>
            
            <div className={'d-flex justify-content-between align-items-center mb-3'}>
                <div className="">
                    <h1 className={'m-0'}>{project.name}</h1>
                </div>
                
            </div>
            <div className="row row-cols-1 row-cols-sm-2 g-4 mb-3">
                <div className="col">
                    <div className="text-muted small">Start</div>
                    <div className="fw-semibold">
                    {new Date(project.start_date).toLocaleDateString()}
                    </div>
                </div>

                <div className="col">
                    <div className="text-muted small">Due</div>
                    <div className="fw-semibold">
                    {new Date(project.end_date).toLocaleDateString()}
                    </div>
                </div>

                <div className="col">
                    <div className="text-muted small">Client</div>
                    <div className="fw-semibold">{project.client}</div>
                </div>

                <div className="col">
                    <div className="text-muted small">Location</div>
                    <div className="fw-semibold">{project.site}</div>
                </div>

                <div className="col">
                    <div className="text-muted small">Status</div>
                    <span className={`badge ${statusColor(project.status as status)}`}>
                    {project.status}
                    </span>
                </div>

                <div className="col">
                    <div className="text-muted small">Budget</div>
                    <div className="fw-semibold">${project.budget}</div>
                </div>

                <div className="col">
                    <div className="text-muted small">Manager</div>
                    <div className="fw-semibold">{project.manager}</div>
                </div>
            </div>
            <div className={'col-md-6 mb-3'}>
                <div className={'col mb-3'}>
                    <div className="text-muted small">Description</div>
                    <div className="fw-semibold">{project.description}</div>
                </div>
                <div className={'col'}>
                    <p className="text-muted small">Progress:</p>
                    <div style={{height:'12px'}} className={'border border-1 rounded-3 overflow-hidden bg-light my-1'}>
                        <p className={'m-0 py-2'} style={{backgroundImage:'linear-gradient(135deg,rgb(255,56,92) 20%,rgb(189,30,89))',width:`${project.avg_progress||0}%`}}></p>
                    </div>
                    <p className={'my-0 text-muted small mt-1 fst-italic'}>{Math.round(project.avg_progress)||0}% completed</p>
                </div>
            </div>
            <div className={'d-md-none create-btn h1 d-flex align-items-center justify-content-center position-fixed bottom-0 end-0 mb-4 me-4'}>
                <Link className={'text-white d-flex align-items-center justify-content-center my-auto'} href={'/projects/'+projectId+'/tasks/create'}>
                    <span>+</span>
                </Link>
            </div>
            <div className={'mb-3'}>
                <Link className={'btn btn-outline-dark'} href={'/projects/'+projectId+'/chart'}>
                    <FaChartGantt /> Chart
                </Link>
            </div>
            <div className={'mb-3'}>
                <div className="d-flex justify-content-between">
                    <h3 className={'h3 mb-3'}>Tasks:</h3>
                    <div className={'d-none d-md-block mb-3'}>
                        <Link className={'btn btn-outline-dark'} href={'/projects/'+projectId+'/tasks/create'}>
                            <IoMdAdd /> Add task
                        </Link>
                    </div>
                </div>
            </div>
            <div className={'mb-3'}>
                {(tasks&&tasks.length>0)&&<div>
                    <button
                        className="btn btn-outline-dark d-flex align-items-center gap-2 mb-3"
                        onClick={() => setCardView((prev) => !prev)}
                        aria-label={cardView ? "Switch to table view" : "Switch to card view"}>
                        {cardView ? <MdTableRows size={20} /> : <MdViewModule size={20} />}
                        <span className="d-none d-sm-inline">{cardView ? "Switch to Table View" : "Switch to Card View"}</span>
                    </button>
                </div>}
                {!cardView?<TasksTableView tasks={tasks}></TasksTableView>:<CardViewTasks tasks={tasks}></CardViewTasks>}
            </div>
            <div className={'mb-3'}>
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
                <p>Last updated: {new Date(project.updated_at).toLocaleString()}</p>
            </div>
        </div>
    )
}

export default Home