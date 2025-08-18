import {NextRequest, NextResponse} from "next/server";
import {pool} from "@/utils/db";
import {tokens} from "@/libs/enums";
import GetUserFromCookies from "@/utils/GetUserFromCookies";
import {User} from "@/libs/interfaces";
import {cookies} from "next/headers";

export async function GET (req:NextRequest){
    let user:User
    try{
        user = await GetUserFromCookies(tokens.ACCESS_TOKEN)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id')
    if(!id){
        try{
            const projects = await pool.query('SELECT * FROM projects WHERE user_id = $1', [user.id])
            return NextResponse.json(projects.rows)
        }catch(error){
            console.log(error)
            return NextResponse.json({error:"Internal server error"},{status:500})
        }
    }
    try{
        const project = await pool.query('SELECT p.*,ROUND(AVG(t.progress),0) AS avg_progress FROM projects p LEFT JOIN tasks t ON p.id = t.project_id WHERE p.id = $1 AND p.user_id = $2 GROUP BY p.id', [id,user.id])
        const tasks = await pool.query('SELECT t.* FROM tasks t WHERE t.project_id = $1 ORDER BY t.task_start_date DESC', [id])
        return NextResponse.json({project:project.rows[0],tasks:tasks.rows})
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}