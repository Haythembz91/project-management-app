'use client'
import FetchWithAuth from "@/utils/FetchWithAuth";
import React, {useEffect} from "react";
import {useParams} from "next/navigation";
import {Task} from "@/libs/interfaces";
import {IoArrowBackOutline} from "react-icons/io5";
import Link from "next/link";
import {priorityIcon} from "@/utils/PriorityIcon";
import {statusColor} from "@/utils/StatusColor";
import {status} from "@/libs/enums";

const Home = ()=>{

    const {slug} = useParams()
    const [task,setTask] = React.useState<Task|null>(null)

    const getTask = async()=>{
        try{
            const response = await FetchWithAuth(`/api/tasks?id=${slug}`,
                {method:'GET'})
            if(!response.ok){
                if(response.status===401){
                    window.location.href = '/auth/login'
                    return
                }
                console.error(response.statusText)
                return
            }
            const data = await response.json()
            setTask(data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        const fetchTask = async()=>{
            await getTask()
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
        <div className={'container-fluid'}>
            <div className={'mb-3'}>
                <Link href={'/projects/' + task.project_id}>
                    <IoArrowBackOutline /> Back to project page
                </Link>
            </div>
            <div className={'mb-3'}>
                <h1 className={'mb-3'}>Project: {task.project_name}</h1>
                <h2>Task: {task.name}</h2>
            </div>
            <div className={'row row-cols-1 row-cols-md-2 mb-3'}>
                <p className={'col'}>Description: {task.description}</p>
                <p className={'col'}>Priority: {priorityIcon(task.priority)} {task.priority}</p>
                <div className={'col'}>
                    <p className={'m-0'}>Status: <span className={'badge'+' '+statusColor(task.status as status)}>{task.status}</span></p>
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
            <button className={'grdbtn'}>Update task</button>
        </div>
    )
}

export default Home