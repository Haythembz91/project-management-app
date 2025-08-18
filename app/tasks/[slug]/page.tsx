import TaskPageContainer from "@/components/TaskPageContainer";
import {Task} from "@/libs/interfaces";
import FetchingWithAuth from "@/utils/FetchingWithAuth";
import {baseUrl} from "@/libs/const";

const Home = async ({params}:{params:Promise<{slug:string}>})=>{

    const {slug} = await params
    let task:Task|null = null
    try{
        const response = await FetchingWithAuth(`${baseUrl}/api/tasks?id=${slug}`,{
            method:'GET'})
        if(!response.ok){
            if(response.status===401){
            return null
            }
        }
        task = await response.json()
    }catch(e){
        console.log(e)
    }

    return(
        <TaskPageContainer task={task}></TaskPageContainer>
    )
}

export default Home