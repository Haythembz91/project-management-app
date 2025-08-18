import {baseUrl} from "@/libs/const";
import {cookies} from "next/headers";

const FetchingWithAuth = async (url:string,options:RequestInit)=>{

    const cookieStore = await cookies()
    let cookieHeader = cookieStore.toString()
    const response = await fetch(url, {...options, cache:'no-store' , headers:{
        Cookie:cookieHeader
        }})
    if(!response.ok){
        if(response.status===401){
            try{
                const refreshResponse = await fetch(`${baseUrl}/api/auth/refresh`,{
                    method:'POST',
                    headers:{
                        Cookie:cookieHeader
                    }
                })
                if(!refreshResponse.ok){
                    return refreshResponse
                }
                const setCookieHeader = refreshResponse.headers.get('Set-Cookie')
                if(!setCookieHeader){
                    return refreshResponse
                }
                cookieHeader = setCookieHeader
                return await fetch(url, {...options,
                    cache:'no-store',
                    headers:{
                        Cookie:cookieHeader
                    }})
            }catch(error){
                console.log(error)
            }
        }
    }
    return response
}

export default FetchingWithAuth