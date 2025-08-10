'use client'
import React from "react";
import {useRouter} from "next/navigation";
import {statusList} from "@/libs/const";
import FetchWithAuth from "@/utils/FetchWithAuth";

const AddProjectForm = ()=>{

    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const router = useRouter()
    const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsLoading(true)
        setError('')
        const formData = new FormData(e.currentTarget)
        const projectStartDate = new Date(formData.get('projectStartDate') as string).getTime()
        const projectEndDate = new Date(formData.get('projectEndDate') as string).getTime()
        if(projectEndDate<projectStartDate){
            setError('Start date must be before end date')
            setIsLoading(false)
            return
        }
        try{
            const response = await FetchWithAuth('/api/projects/create',{
                method:'POST',
                body:formData
            })
            if(!response.ok){
                if(response.status===401){
                    setIsLoading(false)
                    setError('Session expired, you will be redirected to login page')
                    setTimeout(()=>{
                        router.push('/auth/login')
                    },2000)
                    return
                }
                const error = await response.json()
                setError(error.error)
                setIsLoading(false)
                return
            }
            setError('')
            const data = await response.json()
            router.push(`/projects/${data.projectId}`)
        }catch(error){
            console.log(error)
        }finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={'container-fluid'}>
            <h1 className={'h1 mb-3'}>Add Project:</h1>
            <form onSubmit={handleProjectSubmit} className={'col-md-6'}>
                <div className="form-floating mb-3">
                    <input required  type="text" name={'projectName'} className="form-control" id="projectName" placeholder="projectName"/>
                    <label htmlFor="projectName">Project&apos;s name</label>
                </div>
                <div className="form-floating mb-3">
                    <input required type="text" name={'projectDescription'} className="form-control" id="projectDescription" placeholder="projectDescription"/>
                    <label htmlFor="projectDescription">Project&apos;s description</label>
                </div>
                <div className="form-floating mb-3">
                    <input required type="text" name={'projectSite'} className="form-control" id="projectSite" placeholder="projectSite"/>
                    <label htmlFor="projectSite">Project&apos;s site</label>
                </div>
                <div className="form-floating mb-3">
                    <input required type="text" name={'projectClient'} className="form-control" id="projectClient" placeholder="projectClient"/>
                    <label htmlFor="projectClient">Project&apos;s client</label>
                </div>
                <div className="form-floating mb-3">
                    <input required type="text" name={'projectManager'} className="form-control" id="projectManager" placeholder="projectManager"/>
                    <label htmlFor="projectManager">Project&apos;s manager</label>
                </div>
                <div className="form-floating mb-3">
                    <input required type="number" name={'projectBudget'} min={1} className="form-control" id="projectBudget" placeholder="projectBudget"/>
                    <label htmlFor="projectBudget">Project&apos;s budget</label>
                </div>
                <div className="form-floating mb-3">
                    <select defaultValue={''} required name={'projectStatus'} className="form-control" id="projectStatus">
                        <option value={''} disabled >Select status</option>
                        {statusList.map((status,index)=>
                            <option key={index} value={status}>{status}</option>
                        )}
                    </select>
                    <label htmlFor="projectStatus">Project&apos;s status</label>
                </div>
                <div className="form-floating mb-3">
                    <input required type="date" name={'projectStartDate'} className="form-control" id="projectStartDate" placeholder="projectStartDate"/>
                    <label htmlFor="projectStartDate">Project&apos;s start date</label>
                </div>
                <div className="form-floating mb-3">
                    <input required type="date" name={'projectEndDate'} className="form-control" id="projectEndDate" placeholder="projectEndDate"/>
                    <label htmlFor="projectEndDate">Project&apos;s end date</label>
                </div>
                {error&&<div className="alert alert-danger mb-3" role="alert">
                    {error}
                </div>}
                {!isLoading?<button className={'btn btn-outline-dark col-12'} type={'submit'}>Add project</button>:
                    <button className="btn btn-outline-dark w-100" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span className={'px-1'} role="status">Adding project...</span>
                    </button>}
            </form>
        </div>
    )
}

export default AddProjectForm