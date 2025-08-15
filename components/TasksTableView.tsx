
import {Task} from "@/libs/interfaces";
import Link from "next/link";

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
                        <td>{task.priority}</td>
                        <td>{Math.round(task.progress)}%</td>
                        <td>{task.status}</td>
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