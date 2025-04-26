import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Spinner } from "../components/Spinner";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if (loading) {
        return <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <Spinner />
            </div>
        </div>
    }
    return <div>
        <Appbar />
        <div className="flex justify-center ">
            <div className=" max-w-xl">
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    publishedDate="19th Apr 2025" />
                )}   
            </div>
        </div>
    </div>

}