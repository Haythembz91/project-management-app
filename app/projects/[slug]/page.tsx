import ProjectPage from "@/components/ProjectPage";
import GetProject from "@/utils/GetProject";

const Home = async ({params}:{params:Promise<{slug:string}>})=>{

    const {slug} = await params
    let result
    try{
        result = await GetProject({id:slug})
    }catch(e){
        console.log(e)
    }

    return (
        <ProjectPage project={result.project} tasks={result.tasks}></ProjectPage>
    )
}

export default Home