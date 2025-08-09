'use client'
import Link from "next/link";
import React from "react";
import getUser from "@/utils/GetUser";
import {useAuth} from "@/contexts/UserContext";
import {useRouter} from "next/navigation";

const Home = ()=>{
    const [error,setError] = React.useState<string>('')
    const [isLoading,setIsLoading] = React.useState(false)
    const {setUser} = useAuth()
    const router = useRouter()
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        const formData = new FormData(e.currentTarget)
        try{
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: formData
            })
            if(!response.ok){
                const error = await response.json()
                setError(error.error)
                setIsLoading(false)
                return
            }
            const data = await getUser()
            setUser(data)
            setError('')
            router.push('/')
        }catch(e){
            console.log(e)
        }finally {
            setIsLoading(false)
        }
    }
    return (
        <div className={'col-md-6 mx-auto d-flex flex-column justify-content-center p-2'}>
            <div className={'container-fluid'}>
                <h3 className={'text-center fw-semibold mb-3'}>Welcome back</h3>
                <p className={'text-center mb-3'}>Login with your Google account</p>
                <div className={'d-flex justify-content-center mb-3'}>
                    <button className={'btn btn-outline-dark'}>
                        <svg style={{height:'24px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className={'px-2'}>
                            Login with Google
                        </span>
                    </button>
                </div>
            </div>
            <div className={'text-center'}>
                <p>
                    Or continue with
                </p>
            </div>
            <div>
                <form onSubmit={handleLogin}>
                    <div className="form-floating mb-3">
                        <input required type="email" name={'email'} className="form-control" id="email" placeholder="email"/>
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input required type="password" name={'password'} className="form-control" id="password" placeholder="Password"/>
                        <label htmlFor="password">Password</label>
                    </div>
                    {error&&<div className="alert alert-danger mb-3" role="alert">
                        {error}
                    </div>}
                    <div className={'mb-3'}>
                        {!isLoading?<button type="submit" className="btn btn-outline-dark w-100">Login</button>:
                            <button className="btn btn-outline-dark w-100" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span className={'px-1'} role="status">Logging in...</span>
                            </button>
                        }
                    </div>
                </form>
                <div className={'d-flex justify-content-center'}>
                    <p>Don&apos;t have an account?
                        <Link className={'px-1 fw-semibold text-dark'} href={'/auth/signup'}>Signup</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Home