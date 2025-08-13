import {Project} from "@/libs/interfaces";

export const SortProjects = (projects:Project[],filter:string)=>{
    switch (filter){
        case 'name':{
            projects.sort((a,b)=>a.name.localeCompare(b.name))
            break
        }
        case 'name-desc':{
            projects.sort((a,b)=>b.name.localeCompare(a.name))
            break
        }
        case 'budget':{
            projects.sort((a,b)=>a.budget-b.budget)
            break
        }
        case 'budget-desc':{
            projects.sort((a,b)=>b.budget-a.budget)
            break
        }
        case 'created_at':{
            projects.sort((a,b)=>new Date(a.created_at).getTime()-new Date(b.created_at).getTime())
            break
        }
        case 'created_at-desc':{
            projects.sort((a,b)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime())
            break
        }
        case 'updated_at':{
            projects.sort((a,b)=>new Date(a.updated_at).getTime()-new Date(b.updated_at).getTime())
            break
        }
        case 'updated_at-desc':{
            projects.sort((a,b)=>new Date(b.updated_at).getTime()-new Date(a.updated_at).getTime())
            break
        }
        case 'start_date':{
            projects.sort((a,b)=>new Date(a.start_date).getTime()-new Date(b.start_date).getTime())
            break
        }
        case 'start_date-desc':{
            projects.sort((a,b)=>new Date(b.start_date).getTime()-new Date(a.start_date).getTime())
            break
        }
        case 'end_date':{
            projects.sort((a,b)=>new Date(a.end_date).getTime()-new Date(b.end_date).getTime())
            break
        }
        case 'end_date-desc':{
            projects.sort((a,b)=>new Date(b.end_date).getTime()-new Date(a.end_date).getTime())
            break
        }
        case 'status':{
            projects.sort((a,b)=>a.status.localeCompare(b.status))
            break
        }
        case 'status-desc':{
            projects.sort((a,b)=>b.status.localeCompare(a.status))
            break
        }
        case 'client':{
            projects.sort((a,b)=>a.client.localeCompare(b.client))
            break
        }
        case 'client-desc':{
            projects.sort((a,b)=>b.client.localeCompare(a.client))
            break
        }
        case 'manager':{
            projects.sort((a,b)=>a.manager.localeCompare(b.manager))
            break
        }
        case 'manager-desc':{
            projects.sort((a,b)=>b.manager.localeCompare(a.manager))
            break
        }
        case 'site':{
            projects.sort((a,b)=>a.site.localeCompare(b.site))
            break
        }
        case 'site-desc':{
            projects.sort((a,b)=>b.site.localeCompare(a.site))
            break
        }
        default:{
            break
        }
    }
    return projects
}