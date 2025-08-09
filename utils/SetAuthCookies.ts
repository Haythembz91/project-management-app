import {NextResponse} from "next/server";
import {tokens} from "@/libs/enums";

const SetAuthCookies = (response:NextResponse,accessToken:string,refreshToken:string)=>{
    const options = {
        httpOnly: true,
        sameSite: 'lax' as const,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    }

    response.cookies.set(tokens.ACCESS_TOKEN, accessToken, {...options,maxAge: 60 * 15})
    response.cookies.set(tokens.REFRESH_TOKEN, refreshToken, {...options,maxAge: 60 * 60 * 24 * 7})

    return response
}

export default SetAuthCookies