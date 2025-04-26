import { Link } from "react-router-dom"


export const Home = () => {
    return <div >
        <div className="border-b border-black flex justify-between p-2">
            <div className="text-3xl font-playfair font-extrabold pl-8">
                Medium
            </div>
            <div>
                <Link to="/signup">
                    <button type="button" className="text-white bg-black-800 hover:bg-gray-900 font-light rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Get started</button>
                </Link>
            </div>

        </div>
        <div className="flex justify-center flex-col pt-10 border-b border-black bg-right">
        <div className="absolute right-0 bottom-50 w-1/2 h-3/4 bg-no-repeat bg-contain bg-right"
                style={{ backgroundImage: "url('src/img/image.jpg.webp')" }}
            />
            <div className="flex justify-start pl-28">
                <div className="max-w-lg">
                    <div className="text-7xl font-playfair font-medium pt-6 ">
                        Human
                    </div>
                    <div className=" font-playfair text-6xl font-medium">
                        stories & ideas
                    </div>
                    <div className="max-w-lg text-xl font-playfair font-semibold text-black-400 pt-10">
                        A place to read, write, and deepen your understanding
                    </div>
                    <div className="pt-10 pb-10">
                        <Link to="/signup">
                            <button type="button" className="text-white bg-black-800 hover:bg-gray-900 font-semibold rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                                Start Reading
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
