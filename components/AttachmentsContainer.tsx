

const AttachmentsContainer = ({attachments}:{attachments:{id:string,url:string,resource_type:string}[]}) => {
    console.log(attachments)
    return (
        <div className={'d-md-flex'}>
            {attachments.map((attachment,index) => 
                {if (attachment.resource_type === 'raw') {
                    return (
                <div className={'mb-3'} key={index}>
                    <a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.id}</a>
                </div>
            )
                }
            return (
                    <div className={'mb-3'} key={index}>
                        <img className={'img-fluid'} src={attachment.url} alt={attachment.id} />
                    </div>
                )
            }
            )}
        </div>
    )
}

export default AttachmentsContainer