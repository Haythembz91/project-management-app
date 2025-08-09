import {NextResponse} from "next/server";
import {tokens} from "@/libs/enums";


export async function POST (){

    const response = NextResponse.json({message:"Logged out successfully"},{status:200})
    try{
        response.cookies.set(tokens.ACCESS_TOKEN,'',{maxAge:0,httpOnly:true,sameSite:'lax' as const,secure:process.env.NODE_ENV === 'production',path:'/'})
        response.cookies.set(tokens.REFRESH_TOKEN,'',{maxAge:0,httpOnly:true,sameSite:'lax' as const,secure:process.env.NODE_ENV === 'production',path:'/'})
        return response
    }catch(err){
        console.log(err)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}