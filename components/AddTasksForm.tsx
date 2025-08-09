'use client'
import {statusList} from "@/libs/const";
import React from "react";

const AddTasksForm = ({id}:{id:string})=>{

    const [error, setError] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const handleTaskSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log('task submitted')
    }
    return (
        <div className={'container-fluid'}>
            <h1 className={'h1 mb-3'}>Add Task:</h1>
            <form onSubmit={handleTaskSubmit} className={'col-md-6'}>
                <div className="form-floating mb-3">
                    <input required type="text" name={'taskName'} className="form-control" id="taskName" placeholder="taskName"/>
                    <label htmlFor="taskName">Task&apos;s name</label>
                </div>
                <div className="form-floating mb-3">
                    <input required type="text" name={'taskDescription'} className="form-control" id="taskDescription" placeholder="taskDescription"/>
                    <label htmlFor="taskDescription">Task&apos;s description</label>
                </div>
                <div className="form-floating mb-3">
                    <input required type="text" name={'assignedTo'} className="form-control" id="assignedTo" placeholder="assignedTo"/>
                    <label htmlFor="assignedTo">Assigned to</label>
                </div>
                <div className="form-floating mb-3">
                    <input required type="text" name={'taskPriority'} className="form-control" id="taskPriority" placeholder="taskPriority"/>
                    <label htmlFor="taskPriority">Task&apos;s priority</label>
                </div>
                <div className="form-floating mb-3">
                    <select defaultValue={''} required name={'taskStatus'} className="form-control" id="taskStatus">
                        <option value={''} disabled >Select status</option>
                        {statusList.map((status,index)=>
                            <option key={index} value={status}>{status}</option>
                        )}
                    </select>
                    <label htmlFor="taskStatus">Task&apos;s status</label>
                </div>
                <div className="mb-3">
                    <label className={'form-label'} htmlFor="taskProgress">Task&apos;s progress: {progress}%</label>
                    <input required onChange={(e)=>setProgress(parseInt(e.target.value))} type="range" min={0} max={100} step={1} name={'taskProgress'} className="form-range" id="taskProgress" placeholder="taskProgress"/>
                    <div className={'d-flex justify-content-between'}><span>0%</span><span>100%</span></div>
                </div>
                <div className="form-floating mb-3">
                    <input required type="date" name={'taskStartDate'} className="form-control" id="taskStartDate" placeholder="taskStartDate"/>
                    <label htmlFor="taskStartDate">Task&apos;s start date</label>
                </div>
                <div className="form-floating mb-3">
                    <input required type="date" name={'taskDueDate'} className="form-control" id="taskDueDate" placeholder="taskDueDate"/>
                    <label htmlFor="taskDueDate">Task&apos;s due date</label>
                </div>
                {error&&<div className="alert alert-danger mb-3" role="alert">
                    {error}
                </div>}
                {!isLoading?<button className={'btn btn-outline-dark col-12'} type={'submit'}>Add task</button>:
                    <button className="btn btn-outline-dark w-100" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span className={'px-1'} role="status">Adding task...</span>
                    </button>}
            </form>
        </div>
    )
}

export default AddTasksForm