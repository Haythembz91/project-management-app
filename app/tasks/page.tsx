'use client'

import React, {useEffect} from "react";
import {Task} from "@/libs/interfaces";
import FetchWithAuth from "@/utils/FetchWithAuth";
import dynamic from 'next/dynamic';

const Gantt = dynamic(
    () =>
        import('@toyokoh/frappe-gantt-react').then((mod) => mod.FrappeGantt),
    { ssr: false }
);

const Home =()=>{

    const [tasks,setTasks] = React.useState<Task[]|null>(null)
    const getTasks = async ()=>{
        try{
            const response = await FetchWithAuth('/api/tasks',{
                method:'GET'
            })
            if(!response.ok){

            }
            const data = await response.json()
            setTasks(data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getTasks().then().catch()
    },[])

    if(!tasks){
        return (
            <div className={'d-flex justify-content-center my-5'}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    const ganttTasks = tasks.map(task=>({
        id:task.id,
        name:task.name,
        start:task.task_start_date,
        end:task.task_due_date,
        progress:task.progress,
        dependencies:''
    })).filter(task=>new Date(task.start).getMonth()===new Date().getMonth()&& new Date(task.start).getFullYear()===new Date().getFullYear())
    console.log(ganttTasks)
    return(
        <div>
            <Gantt
                tasks={ganttTasks}
                viewMode="Day"
                onClick={(task) => console.log(task)}
            />
        </div>
    )
}

export default Home