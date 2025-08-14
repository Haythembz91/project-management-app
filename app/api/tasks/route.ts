import {NextResponse} from "next/server";
import GetUserFromCookies from "@/utils/GetUserFromCookies";
import {tokens} from "@/libs/enums";
import {User} from "@/libs/interfaces";
import {pool} from "@/utils/db";


export async function GET (){

    let user:User
    try{
        user = await GetUserFromCookies(tokens.ACCESS_TOKEN)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    try{
        const tasks = await pool.query('SELECT t.* FROM tasks t JOIN projects p ON t.project_id = p.id WHERE p.user_id = $1 ORDER BY t.task_start_date DESC', [user.id])
        return NextResponse.json(tasks.rows)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}