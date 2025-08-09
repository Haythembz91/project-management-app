
import ProjectsContainer from "@/components/ProjectsContainer";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

const Home = ()=>{



    return (
        <div className={'container-fluid mt-3'}>
            <div className={'d-flex justify-content-end'}>
                <Link className={'btn btn-outline-dark'} href={'/projects/create'}>
                    <IoMdAdd /> Add project
                </Link>
            </div>
            <div className={'mb-3'}>
                <h1 className={'h1 text-center'}>Projects</h1>
            </div>
            <ProjectsContainer></ProjectsContainer>
        </div>

    )
}

export default Home