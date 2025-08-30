import AddTasksForm from "@/components/AddTasksForm";
import {Params} from "@/libs/types";
import BackButton from "@/components/BackButton";
import AddProjectForm from "@/components/AddProjectForm";

const Home = async ()=>{
    return (
        <main className={'container-fluid'}>
            <BackButton></BackButton>
            <h1 className={'h1 mb-3'}>Create Task:</h1>
            <AddTasksForm></AddTasksForm>
        </main>
    )
}

export default Home