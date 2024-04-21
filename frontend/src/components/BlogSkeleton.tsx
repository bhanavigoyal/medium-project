import { Circle } from "./BlogCard"

export const BlogSkeleton=()=>{
    return <div role="status" className="animate-pulse">
        <div className="border-b border-slate-200 pb-4 pt-1 cursor-pointer">
        <div className="flex items-center py-2">
        <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2 w-10 bg-gray-200 rounded-full mb-2.5"></div>
            <div >
                <Circle/>
            </div> 
            <div className="font-thin text-sm text-slate-500 px-2">
            <div className="h-2 w-10 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
        </div>
        <div className="text-xl font-semibold pt-2">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
        <div className="font-thin text-md">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
        
    </div>

        <span className="sr-only">Loading...</span>
    </div>
    
    
}