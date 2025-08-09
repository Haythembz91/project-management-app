import {NextRequest, NextResponse} from "next/server";
import {pool} from "@/utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import SetAuthCookies from "@/utils/SetAuthCookies";
export async function GET (){
    return NextResponse.json({error:'GET request not allowed'},{status:405})
}

export async function POST (req:NextRequest){

    let formData:FormData
    try{
        formData = await req.formData()
    }catch(err){
        console.log(err)
        return NextResponse.json({error:"malformed request"},{status:400})
    }
    if([...formData].length===0){
        return NextResponse.json({error:"empty request"},{status:400})
    }
    const email = formData.get('email')?.toString().trim().toLowerCase()
    const password = formData.get('password')?.toString()
    if(!password){
        return NextResponse.json({error:"Missing password"},{status:422})
    }
    if(!email){
        return NextResponse.json({error:"Missing email"},{status:422})
    }
    try{
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if(existingUser.rows.length===0){
            return NextResponse.json({error:"Invalid credentials"},{status:404})
        }
        const user = existingUser.rows[0]
        const passwordMatch = await bcrypt.compare(password,user.password_hash)
        if(!passwordMatch){
            return NextResponse.json({error:"Invalid credentials"},{status:401})
        }
        const accessToken = jwt.sign({userId:user.id},process.env.JWT_SECRET as string,{expiresIn:'15m'})
        const refreshToken = jwt.sign({userId:user.id},process.env.JWT_REFRESH_SECRET as string,{expiresIn:'7d'})
        const hashedRefreshToken = await bcrypt.hash(refreshToken,10)
        await pool.query("UPDATE refresh_tokens SET hashed_token = $1 WHERE user_id = $2", [hashedRefreshToken,user.id])
        const response = NextResponse.json({message:"User logged in successfully"},{status:200});
        return SetAuthCookies(response,accessToken,refreshToken)
    }catch(err){
        console.log(err)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}