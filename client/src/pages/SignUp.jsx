import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div className="min-h-screen mt-20">
      <div className=" flex p-3 mx-auto md:items-center max-w-3xl flex-col md:flex-row gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className=" font-bold text-4xl dark:text-white">
            <span className=" mr-1 text-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white px-2 py-1">
              Nihals
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5 ">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1 justify-center items-center">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="text"
                placeholder="name@company.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="text" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link className="text-blue-500"> Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
