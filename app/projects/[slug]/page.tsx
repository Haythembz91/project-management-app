'use client'
import Link from "next/link";
import {IoMdAdd} from "react-icons/io";
import {useParams} from "next/navigation";
import React, {useEffect} from "react";
import GetProject from "@/utils/GetProject";
import { IoArrowBackOutline } from "react-icons/io5";
import {Project, Task} from "@/libs/interfaces";
import TasksTableView from "@/components/TasksTableView";
import {MdTableRows, MdViewModule} from "react-icons/md";
import CardViewTasks from "@/components/CardViewTasks";
import {statusColor} from "@/utils/StatusColor";
import {status} from "@/libs/enums";

const Home = ()=>{
    const {slug} = useParams()
    const [project,setProject] = React.useState<Project|null>(null)
    const [tasks,setTasks] = React.useState<Task[]|null>(null)
    const [cardView,setCardView] = React.useState<boolean>(true)
    useEffect(()=>{
        const getProject = async ()=>{
            const p = await GetProject({id:slug as string})
            if(p){
                setProject(p.project)
                setTasks(p.tasks)
            }
        }
        getProject().catch(console.error)
    },[])

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
                <Link href={'/projects'}><IoArrowBackOutline /> Back to projects</Link>
            </div>
            <div className={'d-flex justify-content-between mb-3'}>
                <div>
                    <h1>{project.name}</h1>
                </div>
                <div>
                    <Link className={'btn btn-outline-dark'} href={'/projects/'+slug+'/edit'}>Edit project</Link>
                </div>
            </div>
            <div className={'row row-cols-1 row-cols-sm-2 g-4 mb-3'}>
                <div className={'col'}>
                    <p className={'m-0'}>Start: {new Date(project.start_date).toLocaleDateString()}</p>
                </div>
                <div className={'col'}>
                    <p className={'m-0'}>Due: {new Date(project.end_date).toLocaleDateString()}</p>
                </div>
                <div className={'col'}>
                    <p className={'m-0'}>Client: {project.client}</p>
                </div>
                <div className={'col'}>
                    <p className={'m-0'}>Location: {project.site}</p>
                </div>
                <div className={'col'}>
                    <p className={'m-0'}>Status: <span className={'badge'+' '+statusColor(project.status as status)}>{project.status}</span></p>
                </div>
                <div className={'col'}>
                    <p className={'m-0'}>Budget: ${project.budget}</p>
                </div>
                <div className={'col'}>
                    <p className={'m-0'}>Manager: {project.manager}</p>
                </div>
            </div>
            <div className={'col-md-6 mb-3'}>
                <div className={'col'}>
                    <p className={''}>Description: {project.description}</p>
                </div>
                <div className={'col'}>
                    <p className="card-subtitle">Progress:</p>
                    <div style={{height:'12px'}} className={'border border-1 rounded-3 overflow-hidden bg-light my-1'}>
                        <p className={'m-0 py-2'} style={{backgroundImage:'linear-gradient(135deg,rgb(255,56,92) 20%,rgb(189,30,89))',width:`${project.avg_progress}%`}}></p>
                    </div>
                    <p className={'my-0'}>{Math.round(project.avg_progress)}% complete</p>
                </div>
            </div>
            <div className={'mb-3'}>
                <Link className={'btn btn-outline-dark'} href={'/projects/'+slug+'/tasks/create'}>
                    <IoMdAdd /> Add task
                </Link>
            </div>
            <div className={'mb-3'}>
                <h3 className={'h3 mb-3'}>Tasks:</h3>
                <button
                    className="btn btn-outline-dark d-flex align-items-center gap-2"
                    onClick={() => setCardView((prev) => !prev)}
                    aria-label={cardView ? "Switch to table view" : "Switch to card view"}>
                    {cardView ? <MdTableRows size={20} /> : <MdViewModule size={20} />}
                    <span className="d-none d-sm-inline">{cardView ? "Switch to Table View" : "Switch to Card View"}</span>
                </button>
            </div>
            <div className={'mb-3'}>
                {!cardView?<TasksTableView tasks={tasks}></TasksTableView>:<CardViewTasks tasks={tasks}></CardViewTasks>}
            </div>
            <div>
                <p className={'m-0'}>Last updated: {new Date(project.updated_at).toLocaleDateString()}</p>
            </div>
        </div>
    )
}

export default Home