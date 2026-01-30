'use client'
import Link from "next/link";
import React, {useEffect} from "react";
import {Project} from "@/libs/interfaces";
import { BiSort } from "react-icons/bi";
import {SortProjects} from "@/utils/SortProjects";
import {statusColor} from "@/utils/StatusColor";
import {status} from "@/libs/enums";

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
                    }}>
                        <div className={'d-flex justify-content-between'}>
                            <div>
                                Name
                            </div>
                            <div>
                                <BiSort />
                            </div>
                        </div>
                    </th>
                    <th className={'project-table-th'}>Description</th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'site') setFilter('site-desc'); else setFilter('site');
                    }}>
                        <div className={'d-flex justify-content-between'}>
                            <div>
                                Location
                            </div>
                            <div>
                                <BiSort />
                            </div>
                        </div>
                    </th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'client') setFilter('client-desc'); else setFilter('client');
                    }}>
                        <div className={'d-flex justify-content-between'}>
                            <div>
                                Client
                            </div>
                            <div>
                                <BiSort />
                            </div>
                        </div>
                    </th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'manager') setFilter('manager-desc'); else setFilter('manager');
                    }}>
                        <div className={'d-flex justify-content-between'}>
                            <div>
                                Project Manager
                            </div>
                            <div>
                                <BiSort />
                            </div>
                        </div>
                    </th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'start_date') setFilter('start_date-desc'); else setFilter('start_date');
                    }}>
                        <div className={'d-flex justify-content-between'}>
                            <div>
                                Start Date
                            </div>
                            <div>
                                <BiSort />
                            </div>
                        </div>
                    </th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'end_date') setFilter('end_date-desc'); else setFilter('end_date');
                    }}>
                        <div className={'d-flex justify-content-between'}>
                            <div>
                                End Date
                            </div>
                            <div>
                                <BiSort />
                            </div>
                        </div>
                    </th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'status') setFilter('status-desc'); else setFilter('status');
                    }}>
                        <div className={'d-flex justify-content-between'}>
                            <div>
                                Status
                            </div>
                            <div>
                                <BiSort />
                            </div>
                        </div>
                    </th>
                    <th className={'project-table-th'} onClick={()=> {
                        if (filter === 'budget') setFilter('budget-desc'); else setFilter('budget');
                    }}>
                        <div className={'d-flex justify-content-between'}>
                            <div>
                                Budget
                            </div>
                            <div>
                                <BiSort />
                            </div>
                        </div>
                    </th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'created_at') setFilter('created_at-desc'); else setFilter('created_at');
                    }}>
                        <div className={'d-flex justify-content-between'}>
                            <div>
                                Created At
                            </div>
                            <div>
                                <BiSort />
                            </div>
                        </div>
                    </th>
                    <th className={'project-table-th'} onClick={()=>{
                        if (filter === 'updated_at') setFilter('updated_at-desc'); else setFilter('updated_at');
                    }}>
                        <div className={'d-flex justify-content-between'}>
                            <div>
                                Updated At
                            </div>
                            <div>
                                <BiSort />
                            </div>
                        </div>
                    </th>
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
                        <td>
                            <span className={'badge'+' '+statusColor(project.status as status)}>{project.status}</span>
                        </td>
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