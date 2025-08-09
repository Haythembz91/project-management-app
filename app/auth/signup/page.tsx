'use client'
import Link from "next/link";
import React from "react";
import getUser from "@/utils/GetUser";
import {useRouter} from "next/navigation";
import {useAuth} from "@/contexts/UserContext";

function isPasswordValid(password:string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
}
function isUsernameValid(username: string) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}
const Home = ()=>{

    const [error, setError] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const router = useRouter()
    const {setUser}= useAuth()
    const handleSignup = async (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        const formData = new FormData(e.currentTarget)
        const password = formData.get('password')
        const confirmPassword = formData.get('confirmPassword')
        const username = formData.get('username')
        if(!isUsernameValid(username as string)){
            setError('Username must be 3-20 characters long and contain only letters, numbers, and underscores.')
            setIsLoading(false)
            return
        }
        if(!isPasswordValid(password as string)){
            setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
            setIsLoading(false)
            return
        }
        if(password !== confirmPassword){
            setError('Password does not match')
            setIsLoading(false)
            return
        }
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                body: formData
            })
            if (!response.ok) {
                const error = await response.json()
                setError(error.error)
            }else{
                const data = await getUser()
                setUser(data)
                setError('')
                router.push('/')
            }
        } catch (e) {
            console.log(e)
        }finally {
            setIsLoading(false)
        }
    }
    return (
        <div className={'col-md-6 mx-auto d-flex flex-column justify-content-center p-2'}>
            <div className={'container-fluid'}>
                <h3 className={'text-center fw-semibold mb-3'}>Welcome</h3>
                <p className={'text-center mb-3'}>Sign up with your Google account</p>
                <div className={'d-flex justify-content-center mb-3'}>
                    <button className={'btn btn-outline-dark'}>
                        <svg style={{height:'24px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className={'px-2'}>
                            Sign up with Google
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
                <form onSubmit={handleSignup}>
                    <div className="form-floating mb-3">
                        <input required type="text" name={'username'} className="form-control" id="username" placeholder="username"/>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input required type="email" name={'email'} className="form-control" id="email" placeholder="email"/>
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input required type="password" name={'password'} className="form-control" id="password" placeholder="Password"/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input required type="password" name={'confirmPassword'} className="form-control" id="confirmPassword" placeholder="Confirm Password"/>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                    {error&&<div className="alert alert-danger mb-3" role="alert">
                        {error}
                    </div>}
                    <div className={'mb-3'}>
                        {!isLoading?<button type="submit" className="btn btn-outline-dark w-100">Signup</button>:
                            <button className="btn btn-outline-dark w-100" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span className={'px-1'} role="status">Signing up...</span>
                            </button>
                        }
                    </div>
                </form>
                <div className={'d-flex justify-content-center'}>
                    <p>Already have an account?
                        <Link className={'px-1 fw-semibold text-dark'} href={'/auth/login'}>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Home