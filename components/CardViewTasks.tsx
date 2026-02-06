import React from "react";
import {Tasks} from "@/libs/interfaces";
import {statusColor} from "@/utils/StatusColor";
import  {status} from "@/libs/enums";
import Link from "next/link";
import {priorityIcon} from "@/utils/PriorityIcon";

const CardViewTasks = ({tasks}:{tasks:Tasks[]|null})=>{

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
                <div className="col mt-0 mb-3" key={task.id}>
                    <Link href={'/tasks/' + task.id} className={'text-decoration-none text-dark'}>
                        <div className={'border shadow-card rounded-2 p-2 h-100'}>
                            <div className={'d-flex justify-content-between mb-1'}>
                                <h5 className="card-title fw-semibold">{priorityIcon(task.priority)} {task.name}</h5>
                                <span className={'badge'+' '+statusColor(task.status as status)}>{task.status}</span>
                            </div>
                            <div className={'row row-cols-2'}>
                                <div className={'col'}>
                                    <p className="card-text my-0 text-secondary">Start: </p>
                                    <p className="card-text my-0">{new Date(task.task_start_date).toLocaleDateString()}</p>
                                </div>
                                <div className={'col'}>
                                    <p className="card-text my-0 text-secondary">Due: </p>
                                    <p className="card-text my-0">{new Date(task.task_due_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div>
                                <p className="card-subtitle text-secondary">Progress:</p>
                                <div style={{height:'12px'}} className={'border border-1 rounded-3 overflow-hidden bg-light my-1'}>
                                    <p className={'m-0 py-2'} style={{backgroundImage:'linear-gradient(135deg,rgb(255,56,92) 20%,rgb(189,30,89))',width:`${task.progress}%`}}></p>
                                </div>
                                <p className={'my-0'}>{Math.round(task.progress)}% complete</p>
                            </div>
                            <p className="card-text my-1 border-top">Assigned to: {task.assigned_to}</p>
                            <div>
                                <p className="card-subtitle my-0 fw-semibold">Description:</p>
                                <p className="card-text my-0 ">{task.description}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default CardViewTasks