import {NextRequest, NextResponse} from "next/server";
import {User} from "@/libs/interfaces";
import {tokens} from "@/libs/enums";
import GetUserFromCookies from "@/utils/GetUserFromCookies";
import {pool} from "@/utils/db";

export async function GET (){
    return NextResponse.json({error:'GET request not allowed'},{status:405})
}

export async function POST (req:NextRequest){

    let user:User
    try{
        user = await GetUserFromCookies(tokens.ACCESS_TOKEN)
    }catch(e){
        console.log(e)
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    let formData = new FormData()
    try{
        formData = await req.formData()
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"malformed request"},{status:400})
    }
    const taskId = formData.get('task_id')
    const text = formData.get('text')
    if(!text){
        return NextResponse.json({error:"Missing text"},{status:422})
    }
    try{
        const result = await pool.query('INSERT INTO notes (user_id, text, task_id) VALUES ($1, $2, $3)',[user.id,text,taskId])
        return NextResponse.json(result.rows)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}