import {baseUrl} from "@/libs/const";

const FetchWithAuth = async (url:string,options:RequestInit)=>{
    const response = await fetch(url, {...options})
        if(!response.ok){
            if(response.status===401){
                try{
                    const refreshResponse = await fetch(`${baseUrl}/api/auth/refresh`,{
                        method:'POST',
                        credentials:'include'
                    })
                    if(!refreshResponse.ok){
                        return refreshResponse
                    }
                    const retryResponse = await fetch(url, {...options})
                    return await retryResponse
                }catch(error){
                    console.log(error)
                }
            }
        }
        return response
}

export default FetchWithAuth