import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = ({ type = "string", onPublishClick }: { type?: string , onPublishClick?: () => Promise<string>;}) => {
    const navigate = useNavigate();
    const handlePublish = async () => {
      if (!onPublishClick) return;
  
      try {
        const blogId = await onPublishClick();
        if (blogId) {
          navigate(`/blog/${blogId}`);
        }
      } catch (err) {
        console.error("Publish failed:", err);
      }
    };
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to="/blogs" className="flex justify-center flex-col font-playfair font-extrabold text-xl">
            Medium
        </Link>
        <div className="flex justify-center">
        {type === "publish" ? (
          <button
            type="button"
            onClick={handlePublish}
            className="mr-5 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
              focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Publish
          </button>
        ) : (
          <Link to="/publish">
            <button
              type="button"
              className="mr-5 text-white bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                focus:ring-slate-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Create a Blog
            </button>
          </Link>
        )}

        <Avatar size="big" name="Prashant" />
      </div>
    </div>
}