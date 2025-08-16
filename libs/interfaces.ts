import {priorities, status} from "@/libs/enums";

export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    client: string;
    manager: string;
    site: string;
    start_date: string;
    end_date: string;
    status: string;
    budget: number;
    created_at: string;
    updated_at: string;
    avg_progress: number;
}

export interface Task {
    name:string;
    description:string;
    priority:priorities;
    progress:number;
    status:status;
    assigned_to:string;
    task_start_date:string;
    task_due_date:string;
    id:string;
    created_at:string;
    updated_at:string;
    project_name?:string;
    project_id:string;
}

export interface GanttTask {
    id: string;
    name: string;
    start: string;
    end: string;
    progress: number;
    dependencies: string;
    project_id: string;
}