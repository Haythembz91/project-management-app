'use client'
import { FrappeGantt, Task, ViewMode } from '@toyokoh/frappe-gantt-react';
import React, {useEffect} from "react";
import FetchWithAuth from "@/utils/FetchWithAuth";
import dynamic from 'next/dynamic';
import { Tasks } from '@/libs/interfaces';
import { viewModeList } from '@/libs/const';

const Gantt = dynamic(
    () =>
        import('@toyokoh/frappe-gantt-react').then((mod) => mod.FrappeGantt),
    { ssr: false }
);

const Home =()=>{

    const [tasks,setTasks] = React.useState<Task[]|null>(null)
    const [from,setFrom] = React.useState<string>(new Date().toISOString().split('T')[0])
    const today = new Date ()
    const sevendays = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    const [to,setTo] = React.useState<string>(sevendays.toISOString().split('T')[0])
    const [viewMode,setViewMode] = React.useState<ViewMode>(ViewMode.Day)
    const getTasks = async ()=>{
        try{
            const response = await FetchWithAuth(`/api/tasks?from=${from}&to=${to}`,{
                method:'GET'
            })
            if(!response.ok){
                if(response.status===401){
                    window.location.href = '/auth/login'
                    return
                }
                console.error(response.statusText)
                return
            }
            const data = await response.json()
            setTasks(data.map((task:Tasks)=>{
                return {
                    id:task.id,
                    name:task.name,
                    start:task.task_start_date,
                    end:task.task_due_date,
                    progress:Number(task.progress),
                    dependencies:task.dependencies?task.dependencies:""
                }
            }))
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getTasks().then().catch()

    },[from,to])

    

    if(!tasks){
        return (
            <div className={'d-flex justify-content-center my-5'}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }



    return(
        <div>
            <div className={'m-3'}>
                <form className={'d-flex'}>
                    <div className={'mb-3 d-flex align-items-center'}>
                        <label htmlFor="from" className={'form-label p-2'}>From:</label>
                        <input type="date" value={from} onChange={(e)=>setFrom(p=>e.target.value)} id={'from'} className={'form-control'}/>
                    </div>
                    <div className={'mb-3 d-flex align-items-center'}>
                        <label htmlFor="to" className={'form-label p-2'}>To:</label>
                        <input type="date" value={to} onChange={(e)=>setTo(p=>e.target.value)} min={from} id={'to'} className={'form-control'}/>
                    </div>
                </form>
            </div>
            <div className={'col-md-6 m-3'}>
                <label htmlFor={'viewMode'} className={'form-label'}>View Mode:</label>
                <select id={'viewMode'} className="form-select mb-3" onChange={(e)=>setViewMode(p=>e.target.value as ViewMode)} aria-label="Default select example">
                    <option defaultValue={'View Mode'}>View Mode</option>
                    {viewModeList.map((viewMode)=>(<option key={viewMode} value={viewMode}>{viewMode}</option>))}
                </select>
            </div>
            {tasks.length===0?
                <div className={'d-flex justify-content-center my-5'}>
                    <p>No tasks found for the selected range</p>
                </div>:
                <FrappeGantt
                    tasks={tasks as Task[]}
                    viewMode={viewMode as ViewMode}
                />
            }
        </div>
    )
}

export default Home