'use client'
import React, {useEffect} from "react";
import {useParams, useRouter} from "next/navigation";
import {statusList} from "@/libs/const";
import FetchWithAuth from "@/utils/FetchWithAuth";
import GetProject from "@/utils/GetProject";
import {Project} from "@/libs/interfaces";

const AddProjectForm = ()=>{

    const [isLoading, setIsLoading] = React.useState(false)
    const [project,setProject] = React.useState<Project|null>(null)
    const [error, setError] = React.useState('')
    const router = useRouter()
    const {slug} = useParams()

    const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsLoading(true)
        setError('')
        const formData = new FormData(e.currentTarget)
        formData.append('projectId',slug as string)
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
            router.push(`/projects/${data.id}`)
        }catch(error){
            console.log(error)
            setError('Internal server error')
        }finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        const getProject = async ()=>{
            const p = await GetProject({id:slug as string})
            if(p.project){
                setProject(p.project)
            }
            if(p.error){
                setError(p.error)
            }
        }
        getProject().catch(console.error)
    },[slug])


    if(error){
        return (
            <div>
                <div className={'d-flex justify-content-center my-5'}>
                    <div className="alert alert-danger" role="alert">
                        Project not found
                    </div>
                </div>
            </div>
        )
    }

    if(slug&&!project){
        return (
            <div>
                <div className={'d-flex justify-content-center my-5'}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section>
            <form onSubmit={handleProjectSubmit} className={'col-md-6'}>
                <div className="form-floating mb-3">
                    <input defaultValue={project?.name} required  type="text" name={'projectName'} className="form-control" id="projectName" placeholder="projectName"/>
                    <label htmlFor="projectName">Project&apos;s name</label>
                </div>
                <div className="form-floating mb-3">
                    <input required defaultValue={project?.description} type="text" name={'projectDescription'} className="form-control" id="projectDescription" placeholder="projectDescription"/>
                    <label htmlFor="projectDescription">Project&apos;s description</label>
                </div>
                <div className="form-floating mb-3">
                    <input required defaultValue={project?.site} type="text" name={'projectSite'} className="form-control" id="projectSite" placeholder="projectSite"/>
                    <label htmlFor="projectSite">Project&apos;s site</label>
                </div>
                <div className="form-floating mb-3">
                    <input defaultValue={project?.client} required type="text" name={'projectClient'} className="form-control" id="projectClient" placeholder="projectClient"/>
                    <label htmlFor="projectClient">Project&apos;s client</label>
                </div>
                <div className="form-floating mb-3">
                    <input defaultValue={project?.manager} required type="text" name={'projectManager'} className="form-control" id="projectManager" placeholder="projectManager"/>
                    <label htmlFor="projectManager">Project&apos;s manager</label>
                </div>
                <div className="form-floating mb-3">
                    <input required defaultValue={project?.budget} type="number" name={'projectBudget'} min={1} className="form-control" id="projectBudget" placeholder="projectBudget"/>
                    <label htmlFor="projectBudget">Project&apos;s budget</label>
                </div>
                <div className="form-floating mb-3">
                    <select defaultValue={project?.status?project.status:''} required name={'projectStatus'} className="form-control" id="projectStatus">
                        <option value={''} disabled >Select status</option>
                        {statusList.map((status,index)=>
                            <option key={index} value={status}>{status}</option>
                        )}
                    </select>
                    <label htmlFor="projectStatus">Project&apos;s status</label>
                </div>
                <div className="form-floating mb-3">
                    <input defaultValue={project?.start_date&&new Date(project?.start_date).toISOString().split('T')[0]} required type="date" name={'projectStartDate'} className="form-control" id="projectStartDate" placeholder="projectStartDate"/>
                    <label htmlFor="projectStartDate">Project&apos;s start date</label>
                </div>
                <div className="form-floating mb-3">
                    <input defaultValue={project?.end_date&&new Date(project?.end_date).toISOString().split('T')[0]} required type="date" name={'projectEndDate'} className="form-control" id="projectEndDate" placeholder="projectEndDate"/>
                    <label htmlFor="projectEndDate">Project&apos;s end date</label>
                </div>
                {error&&<div className="alert alert-danger mb-3" role="alert">
                    {error}
                </div>}
                {!isLoading?<button className={'btn btn-outline-dark col-12'} type={'submit'}>{slug?'Update project':'Add project'}</button>:
                    <button className="btn btn-outline-dark w-100" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span className={'px-1'} role="status">{slug?'Updating project...':'Adding project...'}</span>
                    </button>}
            </form>
        </section>
    )
}

export default AddProjectForm