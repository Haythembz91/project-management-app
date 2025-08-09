import GetUserFromCookies from "@/utils/GetUserFromCookies";
import {tokens} from "@/libs/enums";
import {NextResponse} from "next/server";

export async function GET (){
    try{
        const user = await GetUserFromCookies(tokens.ACCESS_TOKEN)
        return NextResponse.json(user)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
}