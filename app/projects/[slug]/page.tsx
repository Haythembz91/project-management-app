import Link from "next/link";
import {IoMdAdd} from "react-icons/io";
import {Params} from "@/libs/types";

const Home = async ({params}:Params)=>{
    const {slug} = await params
    return (
        <div>
            <div className={'d-flex justify-content-end'}>
                <Link className={'btn btn-outline-dark'} href={'/projects/'+slug+'/tasks/create'}>
                    <IoMdAdd /> Add task
                </Link>
            </div>
        </div>
    )
}

export default Home