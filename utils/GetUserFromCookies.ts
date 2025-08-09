import {jwtVerify} from "jose";
import {tokens} from "@/libs/enums";
import {cookies} from "next/headers";
import {JwtPayload} from "jsonwebtoken";
import {pool} from "@/utils/db";
import bcrypt from "bcrypt";
import {User} from "@/libs/interfaces";


const GetUserFromCookies = async (token:tokens): Promise<User>=>{

    const cookieStore = await cookies();
    const authToken = cookieStore.get(token)?.value;
    const secret = token === tokens.ACCESS_TOKEN ? process.env.JWT_SECRET : process.env.JWT_REFRESH_SECRET
    if(!secret){
        throw new Error('No secret found');
    }
    if(!authToken){
        throw new Error('No auth token found');
    }
    let decodedToken;
    try{
        const {payload} = await jwtVerify(authToken, new TextEncoder().encode(secret as string));
        decodedToken = payload;
    }catch(error){
        console.log(error)
        throw new Error('Invalid token');
    }

    const userId = (decodedToken as JwtPayload & {userId: string}).userId;
    if(!userId){
        throw new Error('Invalid token payload');
    }

    let user:User
    try{
        const result = await pool.query("SELECT id,username,email,role FROM users WHERE id = $1", [userId]);
        user = result.rows[0];
    }catch(error){
        console.log(error)
        throw new Error('Internal server error');
    }

    if(!user){
        throw new Error('User not found');
    }
    if (token===tokens.REFRESH_TOKEN){
        const existingRefreshToken = await pool.query("SELECT hashed_token FROM refresh_tokens WHERE user_id = $1", [userId]);
        if(!existingRefreshToken.rows.length){
            throw new Error('Refresh token not found');
        }
        const refreshToken = existingRefreshToken.rows[0].hashed_token
        const refreshTokenMatch = await bcrypt.compare(authToken,refreshToken)
        if(!refreshTokenMatch){
            throw new Error('Refresh token does not match');
        }
    }

    return user
}

export default GetUserFromCookies