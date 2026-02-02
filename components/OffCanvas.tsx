import { RxHamburgerMenu } from 'react-icons/rx'
import Link from "next/link";
import {User} from "@/libs/interfaces";
import logo from '@/public/assets/logo.png'

const OffCanvas = ({user,handleLogout,isLoading}:{user:User|null,handleLogout:()=>void,isLoading:boolean})=>{
    return(
        <div>
            <a className="d-md-none h2 fw-bold" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                <RxHamburgerMenu />
            </a>

            <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <div className={'navbar-brand'}>
                        <Link href={'/'}>
                            <img style={{height:'50px'}} src={logo.src} alt={'logo'}></img>
                        </Link>
                    </div>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-md-none">
                    <div className={'d-flex flex-column align-items-center'}>
                        <ul className={'navbar-nav nav-underline'}>
                            <li className={'nav-item'}>
                                <Link className={'nav-link'} href={'/'}>Home</Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link className={'nav-link'} href={'/projects'}>Projects</Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link className={'nav-link'} href={'/tasks'}>Tasks</Link>
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
        </div>
    )
}

export default OffCanvas