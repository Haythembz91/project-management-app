import React from "react";
import {Task} from "@/libs/interfaces";
import {statusColor} from "@/utils/StatusColor";
import  {status} from "@/libs/enums";

const CardViewTasks = ({tasks}:{tasks:Task[]|null})=>{

    if(!tasks||tasks.length===0){
        return(
            <p>
                No tasks found
            </p>
        )
    }

    return (
        <div className="row m-0 g-2 row-cols-1 row-cols-md-3 row-cols-lg-4">
            {tasks.map(task => (
                <div className="col" key={task.id}>
                    <div className={'border shadow-card rounded-2 p-2 h-100'}>
                        <div className={'d-flex justify-content-between mb-3'}>
                            <h5 className="card-title fw-semibold">{task.name}</h5>
                            <span className={'badge'+' '+statusColor(task.status as status)}>{task.status}</span>
                        </div>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{task.description}</h6>
                        <p className="card-text my-1 border-top">Progress: {Math.round(task.progress)}%</p>
                        <p className="card-text my-1 border-top">Assigned to: {task.assigned_to}</p>
                        <p className="card-text my-1 border-top">Start: {new Date(task.task_start_date).toLocaleDateString()}</p>
                        <p className="card-text my-1 border-top">Due: {new Date(task.task_due_date).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CardViewTasks