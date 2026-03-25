import cloudinary from "./cloudinary";

const UploadToCloudinary = async (file: File, folder: string) => {
    if (!(file instanceof File)) throw new Error("Invalid file");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);   
    return new Promise ((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: folder,
                public_id:  new Date().getTime()+"_"+file.name,
                resource_type: "auto",
            },
            (error, result) => {
                if (error)
                    return reject(error);
                else
                    resolve({url: result!.secure_url, resource_type: result!.resource_type, display_name:result!.display_name});
            }
        ).end(buffer);
    });
}

export default UploadToCloudinary