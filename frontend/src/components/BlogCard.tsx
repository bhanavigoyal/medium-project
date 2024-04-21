import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"
import { RenderHtml } from "./RenderHtml"

interface BlogCardProps{
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id:string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 pb-4 pt-1 cursor-pointer">
        <div className="flex items-center py-2">
            <Avatar name={authorName}/>
            <div className="font-extralight px-2 text-sm">{authorName} </div> 
            <div >
                <Circle/>
            </div>
            <div className="font-thin text-sm text-slate-500 px-2">
            {publishedDate}
            </div>
        </div>
        <div className="text-xl font-semibold pt-2">
        <RenderHtml htmlContent={title}/>
        </div>
        <div className="font-thin text-md">
            <RenderHtml htmlContent={content.slice(0,100)+"..."}/>
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/1000)} minute(s) read`}
        </div>
        
    </div>
    </Link>
}

export function Circle(){
    return<div className="h-0.5 w-0.5 rounded-full bg-slate-500">
    </div>
}