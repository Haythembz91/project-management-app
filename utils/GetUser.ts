const GetUser = async ()=>{
    try{
        const response = await fetch ('/api/auth/user',{
            method:'GET',
            credentials:'include'
        })
        if(!response.ok){
            try{
                const response = await fetch('/api/auth/refresh', {
                    method:'POST',
                    credentials:'include'
                })
                if(!response.ok){
                    return null
                }
                return await response.json()
            }catch(err){
                console.log(err)
                return null
            }
        }
        return await response.json()
    }catch(err){
        console.log(err)
        return null
    }
}

export default GetUser