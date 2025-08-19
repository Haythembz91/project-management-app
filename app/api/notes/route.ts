import {NextRequest, NextResponse} from "next/server";

export async function GET (){
    return NextResponse.json({error:'GET request not allowed'},{status:405})
}

export async function POST (req:NextRequest){
    return NextResponse.json('hello')
}