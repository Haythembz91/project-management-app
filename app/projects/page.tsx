import ProjectPageContainer from "@/components/ProjectPageContainer";
import GetProject from "@/utils/GetProject";
import {Project} from "@/libs/interfaces";
import Link from "next/link";
import {IoMdAdd} from "react-icons/io";
import React from "react";

const Home = async ()=>{

    let projects:Project[]=[]
    try{
        projects = await GetProject({id:""})
    }catch(e){
        console.log(e)
    }

    return (
        <ProjectPageContainer projects={projects}/>
    )
}

export default Home