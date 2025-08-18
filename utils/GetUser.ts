import FetchWithAuth from "@/utils/FetchWithAuth";

const GetUser = async ()=>{
    try{
        const response =  await FetchWithAuth('/api/auth/user',{
            method:'GET'
        })
        if(response.ok){
            return await response.json()
        }
    }catch(err){
        console.log(err)
        return null
    }
}

export default GetUser