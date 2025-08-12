import FetchWithAuth from "@/utils/FetchWithAuth";


const GetProject = async ({id}:{id:string})=>{
     let url
     id? url = `/api/projects?id=${id}` : url = `/api/projects`
    try{
        const response = await FetchWithAuth(url,{
            method:'GET',
        })
        if(!response.ok){
            if(response.status===401){
                window.location.href = '/auth/login'
                return
            }
            return null
        }
        return await response.json()
    }catch(error){
        console.log(error)
    }
}

export default GetProject