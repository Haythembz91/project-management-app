'use client'
import Link from "next/link";
import {IoMdAdd} from "react-icons/io";
import {useParams} from "next/navigation";
import React, {useEffect} from "react";
import GetProject from "@/utils/GetProject";
import { IoArrowBackOutline } from "react-icons/io5";
import {Project, Task} from "@/libs/interfaces";
import TasksTableView from "@/components/TasksTableView";

const Home = ()=>{
    const {slug} = useParams()
    const [project,setProject] = React.useState<Project|null>(null)
    const [tasks,setTasks] = React.useState<Task[]|null>(null)
    console.log(project,tasks)
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
                    <p className={'m-0'}>Client: {project.client}</p>
                </div>
                <div className={'col'}>
                    <p className={'m-0'}>Location: {project.site}</p>
                </div>
                <div className={'col'}>
                    <p className={'m-0'}>Status: {project.status}</p>
                </div>
                <div className={'col'}>
                    <p className={'m-0'}>Budget: ${project.budget}</p>
                </div>
                <div className={'col'}>
                    <p className={'m-0'}>Manager: {project.manager}</p>
                </div>
                <div className={'col'}>
                    <p className={'m-0'}>Overall progress: {project.avg_progress?project.avg_progress+'%':'TBD'}</p>
                </div>
                <div className={'col'}>
                    <p className={'m-0'}>Start: {new Date(project.start_date).toLocaleDateString()}</p>
                </div>
                <div className={'col'}>
                    <p className={'m-0'}>Due: {new Date(project.end_date).toLocaleDateString()}</p>
                </div>
                <div className={'col'}>
                    <p className={'m-0'}>Description: {project.description}</p>
                </div>
            </div>
            <div className={'mb-3'}>
                <Link className={'btn btn-outline-dark'} href={'/projects/'+slug+'/tasks/create'}>
                    <IoMdAdd /> Add task
                </Link>
            </div>
            <div className={'mb-3'}>
                <TasksTableView tasks={tasks}></TasksTableView>
            </div>
            <div>
                <p className={'m-0'}>Last updated: {new Date(project.updated_at).toLocaleDateString()}</p>
            </div>
        </div>
    )
}

export default Home