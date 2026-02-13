import FetchWithAuth from "./FetchWithAuth"

const getAttachments = async (taskId:string)=>{

    const response = await FetchWithAuth(`/api/media?taskId=${taskId}`,{
        method:'GET',
        headers:{"Content-Type":"application/json"},
    })
    if(!response.ok){
        if(response.status===401){
            window.location.href = '/auth/login'
            return
        }
        console.error(response.statusText)
    }
    return await response.json()
}

export default getAttachments