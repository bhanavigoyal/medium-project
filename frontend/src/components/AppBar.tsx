import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

export const AppBar = ({page, onSubmit}:{page:'home'|'publish', onSubmit?:()=>void})=>{
    return <div className="border-b flex justify-between items-center px-10 py-3"> 
    <Link to={"/dashboard"}>
        <div className="cursor-pointer">
            Medium
        </div>
    </Link>
    <div className="flex items-center">
        {page==='home'?
        <Link to='/create'>
            <button type="button" className="text-white mr-2 bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2">+ New</button>
         </Link>:
        <button onClick={onSubmit} type="button" className="text-white mr-2 bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2">Publish</button>
        }
    
    <div>
        <Avatar name="bhanvi"/>
    </div>
    </div>
    </div>
}