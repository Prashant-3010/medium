import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { CreateBlog } from "../hooks";


export const Publish = () => {
    const { setTitle, setContent, title, content } = CreateBlog();

    const handlePublish = async () => {
        const publish = await PublishBlog(title, content);
        return publish.id;
        
    };

    return <div className="flex flex-col">
        <div className="pt-2">
            <Appbar type="publish" onPublishClick={handlePublish}/>
        </div>
        <div className="flex justify-center pt-5">
            <div className="flex justify-center pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <div
                className="inline-block h-20 min-h-[1em] w-0.5 self-stretch bg-slate-200">
            </div>
            <div className="flex justify-center flex-col pl-3">
                <input
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    type="text"
                    placeholder="Title"
                    className="w-full text-5xl font-light text-gray-700 placeholder-gray-400 focus:outline-none mb-4"
                />
                <textarea
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                    placeholder="Tell your story..."
                    className="w-full h-[60vh] text-xl font-light text-gray-700 placeholder-gray-400 focus:outline-none resize-none"
                ></textarea>
            </div>
        </div>
    </div>
}

export async function PublishBlog(title: string, content: string ) {
    if (!title.trim() || !content.trim()) {
        alert("Title and content cannot be empty.");
        return;
      }

    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog/post`, {
            title,
            content,
        },{
           headers : {
            Authorization : localStorage.getItem("token")
           } 
        });
        return response.data;
    } catch (e) {
        console.log(e);
        alert("Error while publishing blog");
    }
}

