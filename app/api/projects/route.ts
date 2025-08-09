import {NextResponse} from "next/server";
import {pool} from "@/utils/db";
import {tokens} from "@/libs/enums";
import GetUserFromCookies from "@/utils/GetUserFromCookies";
import {User} from "@/libs/interfaces";

export async function GET (){
    let user:User
    try{
        user = await GetUserFromCookies(tokens.ACCESS_TOKEN)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    try{
        const projects = await pool.query('SELECT * FROM projects WHERE user_id = $1', [user.id])
        return NextResponse.json(projects.rows)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}