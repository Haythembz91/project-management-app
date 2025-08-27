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
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    let formData = new FormData()
    try{
        formData = await req.formData()
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"malformed request"},{status:400})
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
    const projectId = formData.get('projectId') as string
    if(projectId){
        try{
            const update = await pool.query("UPDATE projects SET name=$1,description=$2,client=$3,manager=$4,site=$5,budget=$6,status=$7,start_date=$8,end_date=$9 WHERE id=$10 AND user_id=$11 RETURNING id",[name,description,client,manager,site,budget,status,startDate,endDate,projectId,user.id])
            if(update.rows.length===0)
                return NextResponse.json({error:"Project not found"},{status:404});
            return NextResponse.json(update.rows[0])
        }catch(error){
            console.log(error)
            return NextResponse.json({error:"Internal server error"},{status:500})
        }
    }
    try{
        const result = await pool.query("INSERT INTO projects (name,description,client,manager,site,budget,status,start_date,end_date,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id",[name,description,client,manager,site,budget,status,startDate,endDate,user.id])
        return NextResponse.json(result.rows[0])
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}
