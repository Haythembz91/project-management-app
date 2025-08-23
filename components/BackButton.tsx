'use client'
import {IoArrowBackOutline} from "react-icons/io5";
import React from "react";
import {useRouter} from "next/navigation";

const BackButton = () => {
    const router = useRouter()
    return (
        <div className={'my-3'}>
            <button className={'backBtn'} onClick={()=>router.back()}><IoArrowBackOutline /> Back</button>
        </div>
    )
}

export default BackButton