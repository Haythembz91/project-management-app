'use client'

import {User} from "@/libs/interfaces";
import Link from "next/link";


const OffCanvas = ({user,handleLogout,isLoading,setShowMenu}:{user:User|null,handleLogout:()=>void,isLoading:boolean,setShowMenu:(showMenu:boolean)=>void})=>{

    return(
        <div className={'d-md-none d-flex flex-column align-items-center w-100'}>
            <ul className={'navbar-nav nav-underline mb-3'}>
                <li className='text-center fw-bold fs-5'>
                    <Link onClick={()=>setShowMenu(false)} className='link-light link-offset-2 link-underline link-underline-opacity-0' href={'/'}>Home</Link>
                </li>
                <li className='text-center fw-bold fs-5'>
                    <Link onClick={()=>setShowMenu(false)} className='link-light link-offset-2 link-underline link-underline-opacity-0' href={'/projects'}>Projects</Link>
                </li>
                <li className='text-center fw-bold fs-5'>
                    <Link onClick={()=>setShowMenu(false)} className='link-light link-offset-2 link-underline link-underline-opacity-0' href={'/tasks'}>Tasks</Link>
                </li>
                <li className='text-center fw-bold fs-5'>
                    <Link onClick={()=>setShowMenu(false)} className='link-light link-offset-2 link-underline link-underline-opacity-0' href={'/reports'}>Reports</Link>
                </li>
                <li className='text-center fw-bold fs-5'>
                    <Link onClick={()=>setShowMenu(false)} className='link-light link-offset-2 link-underline link-underline-opacity-0' href={'/notifications'}>Notifications</Link>
                </li>
            </ul>
            <div className='mt-3'>
                {user?<div className={'d-flex flex-column align-items-center'}>
                    <div className={'px-2 d-flex align-content-center'}>
                        <p className={'fw-semibold my-md-auto text-light'}>Welcome, {user.username}</p>
                    </div>
                    <div className={'px-2'}>
                        {!isLoading?<button className={'btn btn-outline-light'} onClick={handleLogout}>Logout</button>:
                            <button className="w-100" type="button" disabled>
                                <span className="spinner-border spinner-border-sm text-light" aria-hidden="true"></span>
                                <span className={'px-1'} role="status">Logging out...</span>
                            </button>}
                    </div>
                </div>:
                <div className={'d-flex'}>
                    <div className={'px-1'}>
                        <Link onClick={()=>setShowMenu(false)} className={'btn btn-outline-light'} href={'/auth/login'}>Login</Link>
                    </div>
                    <div className={'px-1'}>
                        <Link onClick={()=>setShowMenu(false)} className={'btn btn-outline-light'} href={'/auth/signup'}>Signup</Link>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default OffCanvas