import {Project} from "@/libs/interfaces";
import React from "react";
import Link from "next/link";

const CardViewProjects = ({projects,setProjects}:{projects:Project[],setProjects:React.Dispatch<React.SetStateAction<Project[]>>})=>{
    return (
        <div className={'row row-cols-2 row-cols-md-3 row-cols-lg-4'}>
            {
                projects.map(project=>{
                    return (<Link className={'col text-decoration-none'} key={project.id} href={'/projects/'+project.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{project.name}</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">{project.description}</h6>
                                <p className={'card-text'}>Manager: {project.manager}</p>
                                <p className="card-text">{project.site}</p>
                                <p className="card-text">Budget: ${project.budget}</p>
                            </div>
                        </div>
                    </Link>)
                })
            }
        </div>
    )
}

export default CardViewProjects