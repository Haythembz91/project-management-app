import BackButton from "@/components/BackButton";
import React from "react";
import {Params} from "@/libs/types";


const Home = async ({params}:Params)=>{
    const {slug} = await params
    return (
        <main className={'container-fluid'}>
            <BackButton></BackButton>
            <h1 className={'h1 mb-3'}>Edit Task:</h1>

        </main>
    )
}

export default Home