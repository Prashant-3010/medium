import { Link } from "react-router-dom";

interface BlogCardProps {
    id : number;
    authorName : string;
    title : string;
    content : string;
    publishedDate : string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
} : BlogCardProps) => {
    return <Link to={`/blog/${id}`} className=" p-4 border-b border-slate-200 pb-2">
            <div className="flex">
                <Avatar name={authorName} />
                <div className="flex justify-center flex-col text-sm font-extralight pl-2">
                    {authorName}  
                </div>
                <div className="flex justify-center flex-col pl-2">
                    <Circle/>
                </div>  
                <div className="flex justify-center flex-col text-sm font-thin text-slate-400 pl-2">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="font-thin text-xs text-slate-400 pt-5">
                {`${Math.ceil(content.length / 100)} min read`}
            </div>
    </Link>
}

function Circle () {
    return <div className="h-1 w-1 rounded-full bg-slate-400">

    </div>
}

export function Avatar ({name, size = "small"} : {name : string, size?: "small" | "big"}) {
        return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`font-thin text-gray-600 dark:text-gray-300 ${size === "small" ? "text-xs" : "text-md"}`}>{name[0]}</span>
        </div>
        
}   