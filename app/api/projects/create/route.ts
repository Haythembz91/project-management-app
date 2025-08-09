import {NextRequest, NextResponse} from "next/server";
import {pool} from "@/utils/db";
import {tokens} from "@/libs/enums";
import GetUserFromCookies from "@/utils/GetUserFromCookies";
import {User} from "@/libs/interfaces";


export async function GET(){
    return NextResponse.json({error:'GET request not allowed'},{status:405})
}
export async function POST(req:NextRequest){
    let user:User
    try{
        user = await GetUserFromCookies(tokens.ACCESS_TOKEN)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Unauthorized"},{status:500})
    }
    let formData = new FormData()
    try{
        formData = await req.formData()
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"malformed request"},{status:500})
    }
    if([...formData].length===0) {
        return NextResponse.json({error: "empty request"}, {status: 400})
    }
    for (const [key, value] of formData) {
        if (!value){
            return NextResponse.json({error:`Missing ${key}`},{status:422})
        }
    }
    const projectStartDate = new Date(formData.get('projectStartDate') as string).getTime()
    const projectEndDate = new Date(formData.get('projectEndDate') as string).getTime()
    if(projectEndDate<projectStartDate){
        return NextResponse.json({error:"Start date must be before end date"},{status:422})
    }
    const name = formData.get('projectName') as string
    const description = formData.get('projectDescription') as string
    const client = formData.get('projectClient') as string
    const manager = formData.get('projectManager') as string
    const site = formData.get('projectSite') as string
    const budget = formData.get('projectBudget') as string
    const status = formData.get('projectStatus') as string
    const startDate = formData.get('projectStartDate') as string
    const endDate = formData.get('projectEndDate') as string
    try{
        const result = await pool.query("INSERT INTO projects (name,description,client,manager,site,budget,status,start_date,end_date,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id",[name,description,client,manager,site,budget,status,startDate,endDate,user.id])
        return NextResponse.json(result.rows[0])
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}
