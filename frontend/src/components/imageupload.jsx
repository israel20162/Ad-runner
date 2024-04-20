import { createSignal } from "solid-js";
import { RiMediaImageAddLine } from 'solid-icons/ri'
import toast, { Toaster } from 'solid-toast';
function ImageUpload(props) {
    const [file, setFile] = createSignal(null);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("image", file());
       
        const toastId = toast.loading('Uploading Photos...');
       
        const response = await fetch('http://localhost:5000/api/image/image-upload', {
            method: 'POST',

            body: formData,
        });
        toast.dismiss(toastId);
       
      
        const data = await response.json()
        toast.success('Image Uploaded Successfully');
        setFile(null)
        
        props.setImagepath(data.filePath)

    }
    return (
        <form action="" class="flex md:flex-row flex-col items-center w-full gap-4" enctype="multipart/form-data" onsubmit={handleSubmit}>
            <label for="image-upload" class="flex cursor-pointer w-full   items-center border p-2 rounded-md bg-teal-50/10">
                <label for="image-upload" class="flex cursor-pointer">
                    <RiMediaImageAddLine size={24} class="text-teal-500 " />
                    <span class="ml-2">Upload Image</span>
                </label>
                <input type="file" id="image-upload" name="image" class="hidden px-3 py-2" accept="image/*" onchange={handleFileChange} />
                {file() && (
                    <div class="">
                        <img src={URL.createObjectURL(file())} alt="Uploaded Image" class=" object-cover rounded-lg shadow" />
                    </div>
                )}

            </label>
            <Toaster />
            <button type="submit" class="px-4 py-2 bg-teal-500 rounded">Upload</button>

        </form>

    )
}

export default ImageUpload;