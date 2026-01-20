import { NextRequest, NextResponse } from "next/server";
import { tokens } from "@/libs/enums";
import GetUserFromCookies from "@/utils/GetUserFromCookies";
import { User } from "@/libs/interfaces";
import { pool } from "@/utils/db";

export async function POST (){
    return NextResponse.json({error:'GET request not allowed'},{status:405})
}

export async function GET (){
    return NextResponse.json({error:'GET request not allowed'},{status:405})
}


export async function DELETE(req:NextRequest){
    let user:User
    try{
        user = await GetUserFromCookies(tokens.ACCESS_TOKEN)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    const {taskId,projectId} = await req.json()
    try{
        const result = await pool.query('SELECT * FROM projects WHERE id=$1 AND user_id=$2', [projectId,user.id])
        if(result.rows.length===0){
            return NextResponse.json({error:"Project not found"},{status:404})
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
    try{
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND project_id = $2 AND user_id = $3', [taskId,projectId,user.id])
        return NextResponse.json({message:"Task deleted"})
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
} 
