'use client'
import Link from "next/link";
import {useAuth} from "@/contexts/UserContext";
import {useRouter} from "next/navigation";
import {useState} from "react";
import GetUser from "@/utils/GetUser";
import OffCanvas from './OffCanvas';
import { RxHamburgerMenu } from 'react-icons/rx'

const Header = ()=>{

    const {user,setUser} = useAuth()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [showMenu,setShowMenu] = useState<boolean>(false)
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
            <nav className={'navbar navbar-expand-md'}>
                <div className={'container-fluid px-2'}>
                    <div className={'navbar-brand'}>
                        <Link href={'/'}>
                            <img style={{height:'50px'}} src={"https://res.cloudinary.com/dmgfsayir/image/upload/v1770070255/ChatGPT_Image_Feb_2_2026_11_06_15_PM-modified_pioxta.png"} alt={'logo'}></img>
                        </Link>
                    </div>
                    <div className={'d-none d-md-flex justify-content-between w-100'}>
                        <ul className={'navbar-nav nav-underline'}>
                            <li className={'nav-item'}>
                                <Link className={'nav-link text-light p-1 fw-bold'} href={'/'}>Home</Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link className={'nav-link text-light p-1 fw-bold'} href={'/projects'}>Projects</Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link className={'nav-link text-light p-1 fw-bold'} href={'/tasks'}>Tasks</Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link className={'nav-link text-light p-1 fw-bold'} href={'/reports'}>Reports</Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link className={'nav-link text-light p-1 fw-bold'} href={'/notifications'}>Notifications</Link>
                            </li>
                        </ul>
                        {user?<div className={'d-flex align-content-center'}>
                                <div className={'px-2 d-flex align-content-center'}>
                                    <p className={'fw-semibold my-md-auto text-light'}>Welcome, {user.username}</p>
                                </div>
                                <div className={'px-2'}>
                                    {!isLoading?<button className={'btn btn-outline-light'} onClick={handleLogout}>Logout</button>:
                                        <button className="btn btn-outline-light w-100" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span className={'px-1'} role="status">Logging out...</span>
                                        </button>}
                                </div>
                            </div>:
                            <div className={'d-flex'}>
                                <div className={'px-1'}>
                                    <Link className={'btn btn-outline-light'} href={'/auth/login'}>Login</Link>
                                </div>
                                <div className={'px-1'}>
                                    <Link className={'btn btn-outline-light'} href={'/auth/signup'}>Signup</Link>
                                </div>
                            </div>
                        }
                    </div>
                    <button onClick={()=>setShowMenu(p=>!p)} className="d-md-none fs-1 fw-bold text-light hamburgerMenu">
                        <RxHamburgerMenu />
                    </button>
                </div>
                {showMenu&&<OffCanvas setShowMenu={setShowMenu} user={user} isLoading={isLoading} handleLogout={handleLogout}></OffCanvas>}
            </nav>
        </header>
    )
}
export default Header