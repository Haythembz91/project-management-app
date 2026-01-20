import {NextRequest, NextResponse} from "next/server";
import {User} from "@/libs/interfaces";
import GetUserFromCookies from "@/utils/GetUserFromCookies";
import {priorities, tokens} from "@/libs/enums";
import {pool} from "@/utils/db";

export async function GET (){
    return NextResponse.json({error:'GET request not allowed'},{status:405})
}

export async function POST (req:NextRequest){
    let user:User
    try{
        user = await GetUserFromCookies(tokens.ACCESS_TOKEN)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    let formData : FormData
    try{
        formData = await req.formData()
        for (const [key, value] of formData) {
            if(!value){
                return NextResponse.json({error:`Missing ${key}`},{status:422})
            }
        }
        const projectId = formData.get('projectId')
        try{
            const result = await pool.query("SELECT 1 FROM projects WHERE id = $1 AND user_id = $2",[projectId,user.id])
            if(result.rows.length===0){
                return NextResponse.json({error:"Project not found"},{status:404})
            }
        }catch (error){
            console.log(error)
            return NextResponse.json({error:"Internal server error"},{status:500})
        }
        const taskStartDate = new Date(formData.get('taskStartDate') as string)
        const taskDueDate = new Date(formData.get('taskDueDate') as string)
        if(taskDueDate.getTime()<taskStartDate.getTime()){
            return NextResponse.json({error:"Start date must be before end date"},{status:422})
        }
        const name = formData.get('taskName') as string
        const description = formData.get('taskDescription') as string
        const priority = formData.get('taskPriority') as priorities
        const status = formData.get('taskStatus') as string
        const assignedTo = formData.get('assignedTo') as string
        const taskProgress = parseInt(formData.get('taskProgress') as string) as number
        if(taskProgress<0||taskProgress>100){
            return NextResponse.json({error:"Progress must be between 0 and 100"},{status:422})
        }
        try{
            const addTask = await pool.query("INSERT INTO tasks (project_id,name,description,priority,status,assigned_to,task_start_date,task_due_date,progress,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",[projectId,name,description,priority,status,assignedTo,taskStartDate,taskDueDate,taskProgress,user.id])
            if(addTask.rowCount===0){
                return NextResponse.json({error:"Internal server error"},{status:500})
            }
            return NextResponse.json({message:"Task created successfully"},{status:201})
        }catch(error){
            console.log(error)
            return NextResponse.json({error:"Internal server error"},{status:500})
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}

export async function PUT (req:NextRequest){

    let user:User
    try{
        user = await GetUserFromCookies(tokens.ACCESS_TOKEN)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    let formData : FormData
    try{
        formData = await req.formData()
        for (const [key, value] of formData) {
            if(!value){
                return NextResponse.json({error:`Missing ${key}`},{status:422})
            }
        }
        const taskId = formData.get('taskId');
        const taskStartDate = new Date(formData.get('taskStartDate') as string);
        const taskDueDate = new Date(formData.get('taskDueDate') as string);
        if(taskDueDate.getTime()<taskStartDate.getTime()){
            return NextResponse.json({error:"Start date must be before end date"},{status:422})
        }
        const name = formData.get('taskName') as string
        const description = formData.get('taskDescription') as string
        const priority = formData.get('taskPriority') as priorities
        const status = formData.get('taskStatus') as string
        const assignedTo = formData.get('assignedTo') as string
        const taskProgress = parseInt(formData.get('taskProgress') as string) as number
        if(taskProgress<0||taskProgress>100){
            return NextResponse.json({error:"Progress must be between 0 and 100"},{status:422})
        }
        try{
            const addTask = await pool.query("UPDATE tasks t SET name = $1, description = $2, priority = $3, progress = $4, status = $5, assigned_to = $6, task_start_date = $7, task_due_date = $8, updated_at = NOW() FROM projects p WHERE t.id = $9 AND t.project_id = p.id AND p.user_id = $10 RETURNING *",[name,description,priority,taskProgress,status,assignedTo,taskStartDate,taskDueDate,taskId,user.id])
            if(addTask.rowCount===0){
                return NextResponse.json({error:"Task not found"},{status:404})
            }
            return NextResponse.json({message:"Task updated successfully"},{status:200})
        }catch(error){
            console.log(error)
            return NextResponse.json({error:"Internal server error"},{status:500})
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}