'use client'
import {priorityList, statusList} from "@/libs/const";
import React, {useEffect} from "react";
import FetchWithAuth from "@/utils/FetchWithAuth";
import {useParams, useRouter} from "next/navigation"
import {Tasks} from "@/libs/interfaces";
import getTask from "@/utils/GetTask";

const AddTasksForm = ()=>{

    const [error, setError] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [task,setTask] = React.useState<Tasks|null>(null)
    const [progress, setProgress] = React.useState(0)
    const router = useRouter()
    const {projectId,taskId}=useParams()

    const handleTaskSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsLoading(true)
        setError('')
        const formData = new FormData(e.currentTarget)
        if(projectId){
            formData.append('projectId',projectId as string)
        }
        if(taskId){
            formData.append('taskId',taskId as string)
        }
        const taskStartDate = new Date(formData.get('taskStartDate') as string).getTime()
        const taskDueData = new Date(formData.get('taskDueDate') as string).getTime()
        if(taskDueData<taskStartDate){
            setError('Start date must be before end date')
            setIsLoading(false)
            return
        }
        try{
            const response = await FetchWithAuth('/api/projects/tasks/create',{
                method:taskId?'PUT':'POST',
                body:formData
            })
            if(!response.ok){
                if(response.status===401){
                    setIsLoading(false)
                    setError('Session expired, you will be redirected to login page')
                    setTimeout(()=>{
                        window.location.href = '/auth/login'
                    },2000)
                    return
                }
                const error = await response.json()
                setError(error.error)
                setIsLoading(false)
                return
            }
            setError('')
            router.push(projectId?`/projects/${projectId}`:`/tasks/${taskId}`)
        }catch(error){
            console.log(error)
            setError('Internal server error')
            return
        }finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        const fetchTask = async () => {
            return getTask(taskId as string);
        };
        if(taskId){
            fetchTask().then(r=>{
                setTask(r.task);
                setProgress(r.task.progress);
            });
        }
    }, [taskId]);

    if(!projectId&&!task){
        return(
            <div>
                <div className={'d-flex justify-content-center my-5'}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className={'container-fluid'}>
            <form onSubmit={handleTaskSubmit} className={'col-md-6'}>
                <div className="form-floating mb-3">
                    <input defaultValue={task?.name} required type="text" name={'taskName'} className="form-control" id="taskName" placeholder="taskName"/>
                    <label htmlFor="taskName">Task&apos;s name</label>
                </div>
                <div className="form-floating mb-3">
                    <input defaultValue={task?.description} required type="text" name={'taskDescription'} className="form-control" id="taskDescription" placeholder="taskDescription"/>
                    <label htmlFor="taskDescription">Task&apos;s description</label>
                </div>
                <div className="form-floating mb-3">
                    <input defaultValue={task?.assigned_to} required type="text" name={'assignedTo'} className="form-control" id="assignedTo" placeholder="assignedTo"/>
                    <label htmlFor="assignedTo">Assigned to</label>
                </div>
                <div className="form-floating mb-3">
                    <select defaultValue={task?.priority?task.priority:''} required name={'taskPriority'} className="form-control" id="taskPriority">
                        <option value={''} disabled >Select priority</option>
                        {priorityList.map((priority,index)=>
                            <option key={index} value={priority}>{priority}</option>
                        )}
                    </select>
                    <label htmlFor="taskPriority">Task&apos;s priority</label>
                </div>
                <div className="form-floating mb-3">
                    <select defaultValue={task?.status?task.status:''} required name={'taskStatus'} className="form-control" id="taskStatus">
                        <option value={''} disabled >Select status</option>
                        {statusList.map((status,index)=>
                            <option key={index} value={status}>{status}</option>
                        )}
                    </select>
                    <label htmlFor="taskStatus">Task&apos;s status</label>
                </div>
                <div className="mb-3">
                    <label className={'form-label'} htmlFor="taskProgress">Task&apos;s progress: {Math.round(progress)}%</label>
                    <input required onChange={(e)=>setProgress(parseInt(e.target.value))} type="range" defaultValue={task?.progress?task.progress:0} min={0} max={100} step={1} name={'taskProgress'} className="form-range" id="taskProgress" placeholder="taskProgress"/>
                    <div className={'d-flex justify-content-between'}><span>0%</span><span>100%</span></div>
                </div>
                <div className="form-floating mb-3">
                    <input defaultValue={task?.task_start_date&&new Date(task?.task_start_date).toISOString().split('T')[0]} required type="date" name={'taskStartDate'} className="form-control" id="taskStartDate" placeholder="taskStartDate"/>
                    <label htmlFor="taskStartDate">Task&apos;s start date</label>
                </div>
                <div className="form-floating mb-3">
                    <input defaultValue={task?.task_due_date&&new Date(task?.task_due_date).toISOString().split('T')[0]} required type="date" name={'taskDueDate'} className="form-control" id="taskDueDate" placeholder="taskDueDate"/>
                    <label htmlFor="taskDueDate">Task&apos;s due date</label>
                </div>
                {error&&<div className="alert alert-danger mb-3" role="alert">
                    {error}
                </div>}
                {!isLoading?<button className={'btn btn-outline-dark col-12'} type={'submit'}>{taskId?'Update task':'Add task'}</button>:
                    <button className="btn btn-outline-dark w-100" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span className={'px-1'} role="status">{taskId?'Updating task...':'Adding task...'}</span>
                    </button>}
            </form>
        </section>
    )
}

export default AddTasksForm