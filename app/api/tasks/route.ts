import {NextRequest, NextResponse} from "next/server";
import GetUserFromCookies from "@/utils/GetUserFromCookies";
import {tokens} from "@/libs/enums";
import {User} from "@/libs/interfaces";
import {pool} from "@/utils/db";


export async function GET (req:NextRequest){

    let user:User
    try{
        user = await GetUserFromCookies(tokens.ACCESS_TOKEN)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    try{
        const id = req.nextUrl.searchParams.get('id') as string
        if(id){
            const task = await pool.query('SELECT t.*,p.name AS project_name FROM tasks t JOIN projects p ON t.project_id = p.id WHERE p.user_id = $1 AND t.id = $2 ORDER BY t.task_start_date ASC', [user.id,id])
            const notes = await pool.query('SELECT n.*,u.username,u.email FROM notes n JOIN users u ON n.user_id = u.id WHERE n.task_id = $1', [id])
            return NextResponse.json({task:task.rows[0],notes:notes.rows})
        }
        const from = req.nextUrl.searchParams.get('from') as string
        const to = req.nextUrl.searchParams.get('to') as string
        const tasks = await pool.query('SELECT t.*,p.name AS project_name FROM tasks t JOIN projects p ON t.project_id = p.id WHERE p.user_id = $1 AND t.task_start_date >= $2 AND t.task_start_date <= $3 ORDER BY t.task_start_date DESC', [user.id,from,to])
        return NextResponse.json(tasks.rows)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}