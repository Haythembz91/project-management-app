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
}
