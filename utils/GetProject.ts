import {baseUrl} from "@/libs/const";
import FetchingWithAuth from "@/utils/FetchingWithAuth";


const GetProject = async ({id}:{id:string})=>{

    const url = `${baseUrl}/api/projects?id=${id}`
    try{
        const response = await FetchingWithAuth(url,{
            method:'GET',
            cache:'no-store'
        })
        if(!response.ok){
            if(response.status===401){
                return
            }
            return null
        }
        return response.json()
    }catch(error){
        console.log(error)
    }
}

export default GetProject