import {NextRequest, NextResponse} from "next/server";
import {pool} from "@/utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import SetAuthCookies from "@/utils/SetAuthCookies";
import {roles} from "@/libs/enums";
function isPasswordValid(password:string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
}

function isEmailValid(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isUsernameValid(username: string) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}
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
    const confirmPassword = formData.get('confirmPassword')?.toString()
    const username = formData.get('username')?.toString().trim()
    if(!password||!isPasswordValid(password as string)){
        return NextResponse.json({error:"Invalid password"},{status:422})
    }
    if(password !== confirmPassword){
        return NextResponse.json({error:"Passwords do not match"},{status:422})
    }
    if(!email||!isEmailValid(email as string)){
        return NextResponse.json({error:"Invalid email"},{status:422})
    }
    if(!username || !isUsernameValid(username as string)){
        return NextResponse.json({error:"Invalid username"},{status:422})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    try{
        const existingEmail = await pool.query("SELECT 1 FROM users WHERE email = $1 LIMIT 1", [email]);
        if(existingEmail.rows.length > 0) {
            return NextResponse.json({error:"Email already exists"},{status:409})
        }
        const result =await pool.query("INSERT INTO users (username, email, password_hash,role) VALUES ($1, $2, $3, $4) RETURNING id", [username, email, hashedPassword, roles.ADMIN]);
        const accessToken = jwt.sign({userId: result.rows[0].id}, process.env.JWT_SECRET as string, {expiresIn: '15m'});
        const refreshToken = jwt.sign({userId: result.rows[0].id}, process.env.JWT_REFRESH_SECRET as string, {expiresIn: '7d'});
        const hashedRefreshToken = await bcrypt.hash(refreshToken,10)
        await pool.query("INSERT INTO refresh_tokens (user_id, hashed_token) VALUES ($1, $2)", [result.rows[0].id, hashedRefreshToken]);
        const response = NextResponse.json({message:"User created successfully"},{status:201});
        return SetAuthCookies(response,accessToken,refreshToken)
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}