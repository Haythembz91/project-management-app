'use client'
import logo from '@/public/assets/logo.png'
import Link from "next/link";
import {useAuth} from "@/contexts/UserContext";
import {useRouter} from "next/navigation";
import React from "react";
import GetUser from "@/utils/GetUser";

const Header = ()=>{

    const {user,setUser} = useAuth()
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false);
    const handleLogout = async ()=>{
        setIsLoading(true)
        try{
            const response = await fetch('/api/auth/logout',{
                method:'POST',
                credentials:'include'
            })
            if(response.ok){
                const data = await GetUser()
                setUser(data)
                router.push('/')
            }
        }catch(err){
            console.log(err)
        }finally {
            setIsLoading(false)
        }
    }
    return(
        <header className={'sticky-top'}>
            <nav style={{backgroundColor:'#f7f7f2'}} className={'navbar navbar-expand-md'}>
                <div className={'container-fluid'}>
                    <div className={'navbar-brand'}>
                        <Link href={'/'}>
                            <img style={{height:'50px'}} src={logo.src} alt={'logo'}></img>
                        </Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={'collapse navbar-collapse'} id={'navbarNav'}>
                        <div className={'d-flex justify-content-between w-100'}>
                            <ul className={'navbar-nav nav-underline'}>
                                <li className={'nav-item'}>
                                    <Link className={'nav-link'} href={'/'}>Home</Link>
                                </li>
                                <li className={'nav-item'}>
                                    <Link className={'nav-link'} href={'/projects'}>Projects</Link>
                                </li>
                                <li className={'nav-item'}>
                                    <Link className={'nav-link'} href={'/reports'}>Reports</Link>
                                </li>
                                <li className={'nav-item'}>
                                    <Link className={'nav-link'} href={'/notifications'}>Notifications</Link>
                                </li>
                            </ul>
                            {user?<div className={'d-flex align-content-center'}>
                                    <div className={'px-2 d-flex align-content-center'}>
                                        <p className={'fw-semibold my-md-auto text-dark'}>Welcome, {user.username}</p>
                                    </div>
                                    <div className={'px-2'}>
                                        {!isLoading?<button className={'btn btn-outline-dark'} onClick={handleLogout}>Logout</button>:
                                            <button className="btn btn-outline-dark w-100" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                <span className={'px-1'} role="status">Logging out...</span>
                                            </button>}
                                    </div>
                                </div>:
                                <div className={'d-flex'}>
                                    <div className={'px-1'}>
                                        <Link className={'btn btn-outline-dark'} href={'/auth/login'}>Login</Link>
                                    </div>
                                    <div className={'px-1'}>
                                        <Link className={'btn btn-outline-dark'} href={'/auth/signup'}>Signup</Link>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Header