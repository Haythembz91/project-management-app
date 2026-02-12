import { NextResponse, NextRequest } from 'next/server'
import GetUserFromCookies from '@/utils/GetUserFromCookies'
import { tokens } from '@/libs/enums'
import UploadToCloudinary from '@/utils/UploadToCloudinary'
import { pool } from '@/utils/db'

export async function GET () {
    return NextResponse.json({error:'GET request not allowed'},{status:405})
}

export async function POST (req:NextRequest) {
    let user
    try{
        user = await GetUserFromCookies(tokens.ACCESS_TOKEN)
    }catch(e){
        console.log(e)
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    const formData = await req.formData()
    const files = formData.getAll('file')
    const task_id = formData.get('task_id')
    try{
        const assets = await Promise.all(files.map(file=>{
        return UploadToCloudinary(file as File,'project management app/files/'+'task_'+task_id+'/' as string)
    })) as {url:string,resource_type:string}[]

    assets.forEach((asset) =>{
        const result = pool.query("INSERT INTO task_media (url,task_id,resource_type) VALUES ($1,$2,$3)",[asset.url,task_id,asset.resource_type])
    })

    return NextResponse.json({message:'Files uploaded successfully'})

    }catch(e){
        console.log(e)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}