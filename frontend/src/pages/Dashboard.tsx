import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Dashboard=()=>{
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            <AppBar page="home"/>
        <div className="flex justify-center">
         <div className="flex flex-col justify-center w-80 md:w-[45rem]">
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
        </div>
        </div>
        </div>
    }
    return <div>
        <AppBar page="home"/>
    <div className="flex justify-center">

    <div className="flex flex-col justify-center w-80 md:w-[45rem]">
        {blogs.map(blog=> <BlogCard key={blog.id}
        authorName={blog.author.name || "Anonymous"}
        id={blog.id}
        title={blog.title}
        content={blog.content}
        publishedDate = {"19 april"}/>)}
    
    </div>
    </div>
    </div>
}