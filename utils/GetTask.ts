import FetchWithAuth from "@/utils/FetchWithAuth";

const getTask = async({slug}:{slug:string})=>{
    try{
        const response = await FetchWithAuth(`/api/tasks?id=${slug}`,
            {method:'GET'})
        if(!response.ok){
            if(response.status===401){
                window.location.href = '/auth/login'
                return
            }
            console.error(response.statusText)
        }
        return await response.json()
    }catch(error){
        console.log(error)
    }
}

export default getTask