
import {Task} from "@/libs/interfaces";
import Link from "next/link";
import {priorityIcon} from "@/utils/PriorityIcon";
import {statusColor} from "@/utils/StatusColor";
import {status} from "@/libs/enums";
import React from "react";

const TasksTableView = ({tasks}:{tasks:Task[]|null})=>{

    if(!tasks||tasks.length===0){
        return(
            <p>
                No tasks found
            </p>
        )
    }

    return(
        <div className={'table-responsive'}>
            <table className={'table table-striped table-hover table-bordered'}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Progress</th>
                        <th>Status</th>
                        <th>Assigned to</th>
                        <th>Start Date</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks?.map((task,index)=>(<tr key={task.id}>
                        <td>{index+1}</td>
                        <td>
                            <Link className={'text-dark fw-semibold'} href={`/tasks/${task.id}`}>
                                {task.name}
                            </Link>
                        </td>
                        <td>{task.description}</td>
                        <td>{priorityIcon(task.priority)} {task.priority}</td>
                        <td>{Math.round(task.progress)}%</td>
                        <td>
                            <span className={'badge'+' '+statusColor(task.status as status)}>{task.status}</span>
                        </td>
                        <td>{task.assigned_to}</td>
                        <td>{new Date(task.task_start_date).toLocaleDateString()}</td>
                        <td>{new Date(task.task_due_date).toLocaleDateString()}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default TasksTableView