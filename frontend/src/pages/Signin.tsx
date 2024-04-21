import { Quote } from "../components/Quote"
import { AuthButton } from "../components/AuthButton"
import { AuthHeading } from "../components/AuthHeading"
import { AuthInput } from "../components/AuthInput"
import { AuthSubHeading } from "../components/AuthSubHeading"
import { SigninType } from "@bhanavigoyal/common"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const SignIn = ()=>{

    const [postInputs,setPostInputs] = useState<SigninType>({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    return <div>
            <div className="lg:grid grid-cols-2">
                <div className="h-screen flex justify-center flex-col ">
                <div className="flex justify-center">
    <div className="flex-col w-80 text-center">
        <AuthHeading label={"Welcome Back!"}/>
        <div className=" flex justify-center items-center">
        <AuthSubHeading label = {"Don't have an account?"}/>
        <Link className="underline px-2 text-slate-400" to={"/signup"}>{"Sign Up"}</Link>
        </div>
        <AuthInput onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                email: e.target.value
            })
        }} label={"Email"} placeholder={"abc@example.com"} name={"email"}/>
        <AuthInput onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                password: e.target.value
            })
        }} label={"Password"} type={"password"} placeholder="at least 6 characters" name={"password"}/>
        <AuthButton onClick={async()=>{
            try{
                const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInputs);
                const jwt = response.data.jwt;
                
                localStorage.setItem("token",jwt);
                localStorage.setItem("user", JSON.stringify(postInputs));
                navigate("/dashboard")
                
            }catch(e){
                alert("error")
            }
        }} label = {"Sign In"}/>
        <div className="text-sm text-slate-400 underline">
            Forgot Password?
        </div>
    </div>
</div>
                </div>
                <div className="hidden lg:block">
                    <Quote/>
                </div>
            </div>
        </div>
}