import { NextResponse } from 'next/server'
export async function GET (){
    return NextResponse.json({error:'GET request not allowed'},{status:405})
}

export async function POST (){
    return NextResponse.json({error:'POST request not allowed'},{status:405})
}

export async function DELETE (){
    return NextResponse.json({message:"Media deleted"})
}