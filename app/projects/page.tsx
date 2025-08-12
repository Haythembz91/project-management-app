'use client'
import ProjectsContainer from "@/components/ProjectsContainer";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import React, {useEffect} from "react";
import {Project} from "@/libs/interfaces";
import CardViewProjects from "@/components/CardViewProjects";
import { MdTableRows } from "react-icons/md";
import { MdViewModule } from "react-icons/md";
import GetProject from "@/utils/GetProject";
const Home = ()=>{

    const [projects,setProjects] = React.useState<Project[]|null>(null)
    const [cardView,setCardView] = React.useState<boolean>(false)

    useEffect(()=>{
        const getProjects = async ()=>{
            const p = await GetProject({id:''})
            setProjects(p)
        }
        getProjects().catch(console.error)
    },[])

    if(!projects){
        return (
            <div className={'d-flex justify-content-center my-5'}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    if(projects.length===0){
        return (
                <div className={'d-flex justify-content-between p-3'}>
                    <p className={'h4 mx-2'}>No projects found</p>
                    <Link className={'btn btn-outline-dark'} href={'/projects/create'}>
                        <IoMdAdd /> Add project
                    </Link>
                </div>
        )
    }
    return (
        <div className={'container-fluid mt-3'}>
            <div className={'d-flex justify-content-end'}>
                <Link className={'btn btn-outline-dark'} href={'/projects/create'}>
                    <IoMdAdd /> Add project
                </Link>
            </div>
            <div className={'mb-3'}>
                <h1 className={'h1 text-center'}>Projects</h1>
                <button
                    className="btn btn-outline-dark d-flex align-items-center gap-2"
                    onClick={() => setCardView((prev) => !prev)}
                    aria-label={cardView ? "Switch to table view" : "Switch to card view"}>
                    {cardView ? <MdTableRows size={20} /> : <MdViewModule size={20} />}
                    <span className="d-none d-sm-inline">{cardView ? "Table View" : "Card View"}</span>
                </button>
            </div>
            {cardView?<CardViewProjects projects={projects!} setProjects={setProjects as React.Dispatch<React.SetStateAction<Project[]>>}></CardViewProjects>:<ProjectsContainer projects={projects} setProjects={setProjects as React.Dispatch<React.SetStateAction<Project[]>>}></ProjectsContainer>}
        </div>

    )
}

export default Home