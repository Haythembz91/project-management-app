'use client';

import dynamic from 'next/dynamic';
import BackButton from "@/components/BackButton";
import React, {useEffect} from "react";
import GetProject from "@/utils/GetProject";
import {useParams} from "next/navigation";
import {ViewMode, Task} from "@toyokoh/frappe-gantt-react";

const Gantt = dynamic(
    () =>
        import('@toyokoh/frappe-gantt-react').then((mod) => mod.FrappeGantt),
    { ssr: false }
);

export default function Home() {

    const [tasks,setTasks] = React.useState<Task[]>([])
    const [projectName,setProjectName] = React.useState('')
    const {projectId} = useParams()

    useEffect(()=>{
        const getProject = async ()=>{
            const p = await GetProject({id:projectId as string})
            if(p){
                const newTasks = p.tasks.map((task:{
                    id: string,
                    name: string,
                    progress: number,
                    task_start_date: string,
                    task_due_date: string,
                    dependencies: string
                })=>{
                    return {
                        id:task.id,
                        name:task.name,
                        progress:task.progress,
                        start:task.task_start_date,
                        end:task.task_due_date,
                        dependencies:''
                    }
                })
                setTasks(newTasks)
                setProjectName(p.project.name)
            }
        }
        getProject().catch(console.error)
    },[projectId])

    if(!tasks.length) return (
        <div className={'d-flex justify-content-center my-5'}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    return (
        <main className={'container-fluid'}>
            <BackButton></BackButton>
            <h1>Project: {projectName}</h1>
            <Gantt
                tasks={tasks}
                viewMode={ViewMode.Day}
                onClick={(task) => console.log(task)}
            />
        </main>
    );
}
