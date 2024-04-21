import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/Signin";
import { SignUp } from "./pages/Signup";
import { CreateBlog } from "./pages/CreateBlog";
import {Dashboard} from "./pages/Dashboard";
import { Blog } from "./pages/Blog";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element = {<SignIn/>}/>
          <Route path="/signup" element = {<SignUp/>}/>
          <Route path="/create" element = {<CreateBlog/>}/>
          <Route path="/dashboard" element = {<Dashboard/>}/>
          <Route path="/blog/:id" element = {<Blog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
