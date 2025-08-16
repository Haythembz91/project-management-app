import {priorities} from "@/libs/enums";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
export const priorityIcon =(priority:priorities)=>{

    switch(priority){
        case priorities.LOW:{
            return <FcLowPriority />
        }
        case priorities.MEDIUM:{
            return <FcMediumPriority />
        }
        case priorities.HIGH:{
            return <FcHighPriority />
        }
    }
}