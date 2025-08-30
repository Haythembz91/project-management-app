import AddProjectForm from "@/components/AddProjectForm";
import React from "react";
import BackButton from "@/components/BackButton";

const Home = ()=>{


    return(
        <main className={'container-fluid'}>
            <BackButton></BackButton>
            <h1 className={'h1 mb-3'}>Edit Project:</h1>
            <AddProjectForm></AddProjectForm>
        </main>
    )
}

export default Home