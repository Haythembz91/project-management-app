import {status} from "@/libs/enums";

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

export interface Task{
    project_id: string;
    name:string;
    description:string;
    priority:string;
    progress:number;
    status:status;
    assigned_to:string;
    task_start_date:string;
    task_due_date:string;
    id:string;
    created_at:string;
    updated_at:string;
}