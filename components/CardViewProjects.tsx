import {Project} from "@/libs/interfaces";
import React from "react";
import Link from "next/link";
import {status} from "@/libs/enums";
import {statusColor} from "@/utils/StatusColor";

const CardViewProjects = ({projects}:{projects:Project[]})=>{


    return (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-2">
            {projects.map(project => (
                <div className="col mb-2" key={project.id}>
                    <Link className="border rounded-1 shadow text-decoration-none text-dark h-100 d-block" href={'/projects/' + project.id}>
                        <div className="p-2">
                            <div className={'d-flex justify-content-between'}>
                                <h5 className="card-title">{project.name}</h5>
                                <span className={'badge'+' '+statusColor(project.status as status)}>{project.status}</span>
                            </div>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{project.description}</h6>
                            <p className="card-text">Manager: {project.manager}</p>
                            <p className="card-text">{project.site}</p>
                            <p className="card-text">Budget: ${project.budget}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default CardViewProjects