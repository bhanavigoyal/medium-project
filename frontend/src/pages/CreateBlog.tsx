import { useState } from "react"
import { AppBar } from "../components/AppBar"
import { TextEdit } from "../components/TextEdit"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const CreateBlog=()=>{
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const navigate = useNavigate()

    const handleTitleChange = (value: string) => {
        setTitle(value);
    };
    
    const handleContentChange = (value: string) => {
        setContent(value);
    };

    const handleSubmit = async()=>{

        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
            title,
            content
        },{
           headers:{
            Authorization: localStorage.getItem('token')
           }
        });
        navigate(`/blog/${response.data.id}`)
    }

    return <div>
        <AppBar page="publish" onSubmit={handleSubmit}/>
        <div className="flex flex-col items-center">
        <div className="pt-8 w-80 md:w-[45rem]">
            <TextEdit type="title" onSave={handleTitleChange}/>
        </div>
        <div className="w-80 md:w-[45rem]">
            <TextEdit type="content" onSave={handleContentChange}/>
        </div>
        </div>
    </div>
}