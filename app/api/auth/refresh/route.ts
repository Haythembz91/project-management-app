import {NextResponse} from "next/server";
import GetUserFromCookies from "@/utils/GetUserFromCookies";
import {tokens} from "@/libs/enums";
import {pool} from "@/utils/db";
import bcrypt from "bcrypt";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import SetAuthCookies from "@/utils/SetAuthCookies";


export async function GET (){
    return NextResponse.json({error:'GET request not allowed'},{status:405})
}

export async function POST (){

    const cookieStore = await cookies();
    const authToken = cookieStore.get(tokens.REFRESH_TOKEN)?.value
    if(!authToken){
        return NextResponse.json({error:'Unauthorized'},{status:401})
    }
    try{
        const user = await GetUserFromCookies(tokens.REFRESH_TOKEN)
        const refreshToken = jwt.sign({userId:user.id},process.env.JWT_REFRESH_SECRET as string,{expiresIn:'7d'})
        const accessToken = jwt.sign({userId:user.id},process.env.JWT_SECRET as string,{expiresIn:'15m'})
        const hashedRefreshToken = await bcrypt.hash(refreshToken,10)
        await pool.query("UPDATE refresh_tokens SET hashed_token = $1 WHERE user_id = $2", [hashedRefreshToken,user.id])
        const response = NextResponse.json({user,accessToken,refreshToken},{status:200});
        return SetAuthCookies(response,accessToken,refreshToken)
    }catch(err){
        console.log(err)
        return NextResponse.json({error:'Unauthorized'},{status:401})
    }
}