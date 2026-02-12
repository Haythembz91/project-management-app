import cloudinary from "./cloudinary";
import {v4 as uuidv4} from "uuid";

const UploadToCloudinary = async (file: File, folder: string) => {
    if (!(file instanceof File)) throw new Error("Invalid file");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);   
    return new Promise ((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: folder,
                public_id: uuidv4() + "-" + file.name,
                resource_type: "auto",
            },
            (error, result) => {
                if (error)
                    return reject(error);
                else 
                    resolve({url: result!.secure_url, resource_type: result!.resource_type});
            }
        ).end(buffer);
    });
}

export default UploadToCloudinary