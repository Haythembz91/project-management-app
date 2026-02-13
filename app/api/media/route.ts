import { NextResponse, NextRequest } from "next/server"
import GetUserFromCookies from "@/utils/GetUserFromCookies"
import { tokens } from "@/libs/enums"
import { pool } from "@/utils/db"
export async function GET (req:NextRequest) {
    
    let user 
    try{
        user = await GetUserFromCookies(tokens.ACCESS_TOKEN)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId");
    console.log(taskId)
    try{
        const result = await pool.query('SELECT * FROM task_media WHERE task_id = $1', [taskId])
        return NextResponse.json(result.rows)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
    
}