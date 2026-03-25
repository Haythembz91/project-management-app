import { Attachment } from "@/libs/interfaces"
import { IoDocument } from "react-icons/io5"
const AttachmentsContainer = ({attachments}:{attachments:Attachment[]}) => {
    return (
        <div>
            <div className={'row row-cols-1 row-cols-md-3 row-cols-lg-6'}>
                {attachments.map((attachment,index) => 
                    {if (attachment.resource_type !== 'raw') {
                        return (
                        <div className={'col mb-3'} key={index}>
                            <img className={'img-fluid'} src={attachment.url} alt={attachment.id} />
                        </div>
                    )
                    }
                }
                )}
            </div>
            <div className={'row row-cols-1'}>
                {attachments.map((attachment,index) => 
                    {if (attachment.resource_type === 'raw') {
                        return (
                    <div className={'col mb-3'} key={index}>
                        <a className="text-dark" href={attachment.url} target="_blank" rel="noopener noreferrer">
                            <IoDocument className="fs-1" /> 
                            {attachment.display_name}
                        </a>
                    </div>
                )
                    }
                }
                )}
            </div>
        </div>
    )
}

export default AttachmentsContainer