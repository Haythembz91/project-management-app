import BackButton from "@/components/BackButton";
import React from "react";
import {Params} from "@/libs/types";
import AddTasksForm from "@/components/AddTasksForm";


const Home = async ()=>{
    return (
        <main className={'container-fluid'}>
            <BackButton></BackButton>
            <h1 className={'h1 mb-3'}>Edit Task:</h1>
            <AddTasksForm></AddTasksForm>
        </main>
    )
}

export default Home