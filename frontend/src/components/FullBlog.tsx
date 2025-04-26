import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog, publishedDate }: { blog: Blog, publishedDate: string }) => {
    return <div>
        <Appbar type={"blog"}/>
        <div className="grid grid-cols-12 px-10 w-full pt-10 max-w-screen-xl">
            <div className="grid col-span-8">
                <div className="text-4xl font-extrabold">
                    {blog.title}
                </div>
                <div className="text-sm font-normal text-slate-400 pt-2">
                    Posted on {publishedDate}
                </div>
                <div className="text-sm font-medium text-slate-600 pt-3">
                    {blog.content}
                </div>
            </div>
            <div className="grid col-span-4 pl-10">
                <div className="flex-col">
                    <div className="text-sm font-semibold">
                        Author
                    </div>
                    <div className="flex pt-5">
                        <Avatar name={blog.author.name} size={"big"} />
                        <div className="text-2xl font-bold pl-5 ">
                            {blog.author.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}