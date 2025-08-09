import AddTasksForm from "@/components/AddTasksForm";
import {Params} from "@/libs/types";

const Home = async ({params}:Params)=>{
    const {slug} = await params
    return (
        <AddTasksForm id={slug}></AddTasksForm>
    )
}

export default Home