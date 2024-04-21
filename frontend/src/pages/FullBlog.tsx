import { AppBar } from "../components/AppBar"
import { Avatar } from "../components/Avatar"
import { RenderHtml } from "../components/RenderHtml"
import { Blog } from "../hooks"

export const FullBlog=({blog}:{blog:Blog})=>{
    return<div>
        <AppBar page="home"/>
        <div className="flex justify-center">
    <div className="grid grid-cols-12 w-full px-10 pt-10 max-w-screen-xl">
        <div className="col-span-8 ">
            <div className="text-3xl font-extrabold">
                <RenderHtml htmlContent={blog.title}/>
            </div>
            <div className="text-slate-500 pt-2">
                Posted on 28 Dec 2003
            </div>
            <div className="pt-4">
            <RenderHtml htmlContent={blog.content}/>
            </div>
        </div>
        <div className="col-span-4">
            <div className="font-semibold text-slate-600 text-lg">
                Author
            </div>
            <div className="flex items-center pt-2">
                <Avatar name={blog.author.name}/>
                <div className="px-4">
                    <div className="font-bold text-xl">
                        {blog.author.name || "Anonymous"}
                    </div>
                    <div className="pt-2 text-slate-500 text-sm">
                        Author's Bio goes here
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>

    </div>
    </div>
}