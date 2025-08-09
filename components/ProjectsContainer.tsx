'use client'
import Link from "next/link";
import React, {useEffect} from "react";
import {Project} from "@/libs/interfaces";
import { FaSort } from "react-icons/fa6";
import {SortProjects} from "@/utils/SortProjects";

const ProjectsContainer = ({projects,setProjects}:{projects:Project[],setProjects:React.Dispatch<React.SetStateAction<Project[]>>})=>{

    const [filter,setFilter] = React.useState<string>('')

    useEffect(()=>{
        setProjects(prev=>SortProjects([...prev],filter))
    },[filter])

    return (
        <div className={'table-responsive'}>
            <table className={'table table-striped table-hover table-bordered'}>
                <thead>
                <tr>
                    <th className={'project-table-th'}>#</th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'name') setFilter('name-desc'); else setFilter('name');
                    }}>Name <FaSort /></th>
                    <th className={'project-table-th'}>Description</th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'site') setFilter('site-desc'); else setFilter('site');
                    }}>Site <FaSort /></th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'client') setFilter('client-desc'); else setFilter('client');
                    }}>Client <FaSort /></th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'manager') setFilter('manager-desc'); else setFilter('manager');
                    }}>Project Manager <FaSort /></th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'start_date') setFilter('start_date-desc'); else setFilter('start_date');
                    }}>Start Date <FaSort /></th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'end_date') setFilter('end_date-desc'); else setFilter('end_date');
                    }}>End Date <FaSort /></th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'status') setFilter('status-desc'); else setFilter('status');
                    }}>Status <FaSort /></th>
                    <th className={'project-table-th'} onClick={()=> {
                        if (filter === 'budget') setFilter('budget-desc'); else setFilter('budget');
                    }}>Budget <FaSort /></th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'created_at') setFilter('created_at-desc'); else setFilter('created_at');
                    }}>Created At <FaSort /></th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'updated_at') setFilter('updated_at-desc'); else setFilter('updated_at');
                    }}>Updated At <FaSort /></th>
                </tr>
                </thead>
                <tbody className={'table-group-divider'}>
                {projects.map((project,index)=>(
                    <tr key={project.id}>
                        <td>{index+1}</td>
                        <td>
                            <Link href={'/projects/'+project.id} className={'text-dark fw-semibold'}>
                                {project.name}
                            </Link>
                        </td>
                        <td>{project.description}</td>
                        <td>{project.site}</td>
                        <td>{project.client}</td>
                        <td>{project.manager}</td>
                        <td>{new Date(project.start_date).toLocaleDateString()}</td>
                        <td>{new Date(project.end_date).toLocaleDateString()}</td>
                        <td>{project.status}</td>
                        <td>{project.budget}</td>
                        <td>{new Date(project.created_at).toLocaleDateString()}</td>
                        <td>{new Date(project.updated_at).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProjectsContainer