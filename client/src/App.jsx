import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import FooterComponent from "./components/FooterComponent";
import PrivateRouter from "./components/PrivateRouter";
import IsAdminPrivateRouteOnly from "./components/isAdminPrivateRouteOnly";
import CreatePost from "./pages/CreatePost";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/projects" element={<Project />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route element={<PrivateRouter />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route element={<IsAdminPrivateRouteOnly/>}>
         <Route path="/create-post" element={<CreatePost/>}/>
        </Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}
